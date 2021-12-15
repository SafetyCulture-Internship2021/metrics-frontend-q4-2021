import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";
import "../App.css";
import Graph from "../components/Graph";
import Dropdown from "../components/Dropdown";




export const Home = () => {
    const { authenticatedRequest } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [pingData, setPingData] = useState(null)
    const [selected, setSelected] = useState('Services')


    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            /*await axios.get('/services').then(res =>{
                const newData = JSON.stringify(res.data);
                setNewData(newData)
                console.log(res)
                return newData;

            });*/
            await axios.get('/metrics/test').then(res => {
                console.log(res);
                const pingData = res.data;
                setPingData(pingData)
                return pingData;
            });



            setAccount(data);
            setIsLoading(false);

            });

    }, [authenticatedRequest]);

    if (isLoading) {
        return <div>Loading...</div>;
    }




return (
    <div>Welcome to the app {account.account_name}. service available( {} )
     <div><br/> This is the metrics front end that displays information

        <Dropdown selected={selected} setSelected={setSelected}/>  
        <Graph/>



     </div>
    </div>);
}
