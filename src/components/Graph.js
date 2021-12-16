import React, {useEffect, useState} from 'react'
import axios from "axios";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {mocData} from "./mocdata";


const ChartTypes = Object.freeze({
    Unknown: 'unknown',
    Line: 'line',
});
function getCartData(mocData) {
    /*console.log(mocData.keys)*/
    //const firstCart = Object.keys(mocData['0'])[0]
    /*console.log(mocData)*/
    //console.log(firstCart)
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

        const avgLatency = latencyTotal / latencyCount
        console.log(avgLatency)
        const graphDataItem = {
            name: currentTimeStamp,
            latency: avgLatency,
        }
        console.log(graphDataItem)
        graphData.push(graphDataItem)

    }

    return graphData
}

function Graph() {
    const [metricsData, setMetricsData] = useState(null);
    const [displayChart] = useState(ChartTypes.Unknown);
    const [graphData,setGraphData] = useState(null)
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
    console.log(dataArray)//data appears

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

            {[ChartTypes.Line, ChartTypes.Unknown].indexOf(displayChart) !== -1 && (

                <LineChart

                    width={1000}
                    height={400}
                    data={mocGraphData}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis type="number" domain={[100, 300]}/>
                    <Tooltip/>
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        stroke='#8884d8'
                        dataKey='latency'
                    />


                </LineChart>
            )}
        </div>

    )
}

export default Graph
