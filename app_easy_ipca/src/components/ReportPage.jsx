import {useEffect, useState } from "react"

import "./ReportPage.css"
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT



const ReportPage = ({startDate,endDate}) => {

    
    let mediaTypeXlsx="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
    let mediaTypeJson="data:text/json;charset=utf-8,"
    
    const [reports, setReport] = useState([])
    const [xlsxFile, getXlsxFile] = useState('')
    const [jsonFile, getJsonFile] = useState('')
    const getReport = async (url) => {

        // Get json data
        const request = await fetch(url)
        const data = await request.json()
        const data_json = JSON.parse(data)

        // Data file xlsx
        console.log(url+'&format=xlsx')
        const requestXlsx = await fetch(url+'&format=xlsx')
        const XlsxBase64 = await requestXlsx.json()
        const dataXlsxBase64 = JSON.parse(XlsxBase64)

        setReport(data_json)
        getXlsxFile(dataXlsxBase64["fileXlsxBase64"])
        // Json file to download
        getJsonFile(encodeURIComponent(JSON.stringify(data_json)))
      };

    //console.log(setPostURL)
    //console.log(xlsxFile0)
    useEffect(() => {
        const GetURL = `${apiEndpoint}?data_inicial=${startDate}&data_final=${endDate}`
        getReport(GetURL)

    
    //  getSearchedMovies(searchWithQueryURL)
    }, [startDate,endDate])


    return (
    <div id='page_report'>   
        <div id="report_table">
            <table border="2">
                <caption>Ídice IPCA por Mês</caption>
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Ídice</th>
                    </tr>
                </thead>
                <tbody>
                    {reports && reports.map((row) => <tr key={row.index}><td>{row.data}</td><td>{row.valor}</td></tr>)}
                </tbody>
                <tfoot><tr><td colspan="2">{`Total Acumulado = ${(reports.reduce((soma, row) => { return soma + Number(row.valor); }, 0)).toFixed(2)}`}</td></tr></tfoot>

            </table>
        </div>
        <div id="files_download">
            <div>
            <a href={mediaTypeXlsx + xlsxFile} download="data.xlsx"><button>Excel</button></a>
            <a href={mediaTypeJson + jsonFile} download="data.json"><button>Json</button></a>
            </div>
        </div>
    </div>
    )
}

export default ReportPage