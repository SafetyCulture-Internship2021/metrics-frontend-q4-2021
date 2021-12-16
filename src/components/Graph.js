import React, {useEffect, useState} from 'react'
import axios from "axios";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {mocData} from "./mocdata";


function getCartData(mocData) {

    let graphData = []
    const timestamps = Object.keys(mocData)
    for (let ts_index in timestamps) {
        let latencyArray = []
        const currentTimeStamp = timestamps[ts_index]
        let dataValues = mocData[currentTimeStamp]
        //console.log(dataValues)
        const pod_ids = Object.keys(dataValues)
        for(let pod_index in pod_ids ){
            const pod_id = pod_ids[pod_index]

            const podLatency = mocData[currentTimeStamp][pod_id]['http']['latency']

            latencyArray = latencyArray.concat(podLatency)

        }

        const latencyTotal = latencyArray.reduce((currentTotal, latencyVal) => currentTotal + latencyVal)
        const latencyCount = latencyArray.length

        const maxArray = latencyArray => Math.max(...latencyArray);
        const minArray = latencyArray => Math.min(...latencyArray);
        const avgLatency = latencyTotal / latencyCount
        console.log(avgLatency)



        const graphDataItem = {
            name: currentTimeStamp,
            latency: avgLatency,
            minlatency: minArray(latencyArray),
            maxlatency: maxArray(latencyArray)
        }
        console.log(graphDataItem)
        graphData.push(graphDataItem)

    }

    return graphData
}


function Graph() {
    const [metricsData, setMetricsData] = useState(null);
    const mocGraphData = getCartData(mocData)





    useEffect(() => {
        axios.get('/metrics/test').then(res => {
            const metricsData = res.data;

            /* console.log(metricsData)// data displays*/
            setMetricsData(metricsData)
        });
    }, []);
    /*console.log(metricsData)//data appears*/

    const dataArray = metricsData;
    const [moreData, setMoreData] = useState(metricsData);
    //console.log(dataArray)//data appears

   /* useEffect(() => {
        let keys = Object.keys(metricsData)
        if (metricsData && metricsData.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i]
                dataArray[key] = metricsData[key]
            }
            setMoreData(dataArray)
            console.log(dataArray)

        }
    }, [metricsData])*/
  /*  useEffect(() => {

        for (let i = 0; i < keys.length; i++){
            let key = (keys[i]);
            console.log(metricsData[key])
            setGraphData(metricsData(key))
        }
    },[])*/


    return (
        <div>

                <h3>Service Metrics Data (Min, Max, Average)</h3>
                <LineChart

                    width={1000}
                    height={800}
                    data={mocGraphData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis type="number" domain={[0, 3]}/>
                    <Tooltip/>
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        stroke='#1cadeb'
                        dataKey='latency'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        stroke='green'
                        dataKey='minlatency'
                    />
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        stroke='red'
                        dataKey='maxlatency'
                    />


                </LineChart>
        </div>

    )
}

export default Graph
