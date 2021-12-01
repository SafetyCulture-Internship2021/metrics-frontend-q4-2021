import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";
import "../App.css";


export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
   /* const [newData, setNewData] = useState(null);*/
    /*const [ping, setPingData] = useState(null);*/


    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                 });/*
                 await axios.get('/services').then(res =>{
                     const newData = JSON.stringify(res.data);
                     setNewData(newData)
                     return newData;
                 });*/
                /*await axios.get('/metrics/input').then(res => {
                    console.log(res);
                    const ping = res.data;
                    setPingData(ping)
                    return ping;
                })*/



            setAccount(data);
            setIsLoading(false);
        });
    }, [authenticatedRequest]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<>Welcome to the app {account.account_name}.
    <div>
        <br/> This is the metrics front end that displays information
        {/*<br/> name: {ping.pod_id}
        <br/> time stamp: {ping.time_stamp}
        <br/>http status code: {JSON.stringify(ping.http_status)}
        <br/> avg latency: {ping.avg_latency}
        <br/>99th percentile: {ping.percentile_99}*/}

    </div>
    </>);
}
