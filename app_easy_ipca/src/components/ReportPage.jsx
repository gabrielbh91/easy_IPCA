import {useEffect, useState } from "react"

import "./ReportPage.css"
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT



const ReportPage = ({startDate,endDate}) => {

    const [reports, setReport] = useState([])
    const getReport = async (url) => {
        
        // Get Json IPCA
        const request = await fetch(url)
        console.log(`GET URL = ${url}`)
        const data = await request.json()
        const data_json = JSON.parse(data)

        setReport(data_json)

      };

    //console.log(setPostURL)
    useEffect(() => {
        const GetURL = `${apiEndpoint}?data_inicial=${startDate}&data_final=${endDate}`
        getReport(GetURL)
    
    //  getSearchedMovies(searchWithQueryURL)
    }, [startDate,endDate])


    return (     
    <form id="report_table">
    <table border="2">
        <caption>Ídice IPCA por Mês</caption>
        <thead>
            <tr>
                <th>Mês</th>
                <th>Ídice</th>
            </tr>
        </thead>
        {reports && reports.map((row) => <tr><td>{row.data}</td><td>{row.valor}</td></tr>)}
    </table>
    </form>
    )
}

export default ReportPage