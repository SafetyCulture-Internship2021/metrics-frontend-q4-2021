import React, {useEffect, useState} from 'react'
import axios from "axios";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts'
import {mocData} from "./mocdata";


const ChartTypes = Object.freeze({
    Unknown: 'unknown',
    Line: 'line',
});

function Graph() {
    const [metricsData, setMetricsData] = useState(null);
    const [displayChart] = useState(ChartTypes.Unknown);


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
    /*console.log(dataArray)//data appears*/

    useEffect(() => {
        if (metricsData && metricsData.length > 0) {
            for (let i = 0; i < 40; i++) {
                dataArray[i] = {
                    Latency: metricsData[i].avg_latency,
                    MaxLatency: metricsData[i].avg_max,
                    MinLatency: metricsData[i].avg_min,
                    ServiceType: metricsData[i].service_type
                }
            }
            setMoreData(dataArray)

        }
    }, [metricsData])

    console.log(moreData)//data appears

    console.log(moreData)

    return (
        <div>

            {[ChartTypes.Line, ChartTypes.Unknown].indexOf(displayChart) !== -1 && (

                <LineChart

                    width={1000}
                    height={400}
                    data={moreData}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis type="number" domain={[100, 300]}/>
                    <Tooltip/>
                    <Line
                        type='monotone'
                        strokeWidth={2}
                        stroke='#8884d8'
                    />


                </LineChart>
            )}
        </div>

    )
}

export default Graph
