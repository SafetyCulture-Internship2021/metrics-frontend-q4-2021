import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";
import "../App.css";


export const Home = () => {
    const { authenticatedRequest } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [newData, setNewData] = useState(null);
    const [pingData, setPingData] = useState(null);


    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                 });
                 await axios.get('/services').then(res =>{
                     const newData = JSON.stringify(res.data);
                     setNewData(newData)
                     return newData;
                 });
                await axios.get('/metrics/input').then(res => {
                    console.log(res);
                    const pingData = res.data;
                    setPingData(pingData)
                    return pingData;
                })



            setAccount(data);
            setIsLoading(false);
        });
    }, [authenticatedRequest]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(pingData)
    return (<>Welcome to the app {account.account_name}. service available( {} )

    </>);
}
