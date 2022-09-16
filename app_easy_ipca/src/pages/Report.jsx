import {useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import ReportPage from "../components/ReportPage"

const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

const Report = () => {

    const [searchParams] = useSearchParams();

    const searchParamsStartDate = searchParams.get("startdate")
    const searchParamsEndDate = searchParams.get("enddate")

    let titleReport = new String
    let startDate = new String
    let endDate = new String


    if (searchParamsStartDate){ 
        const [startYear,startMonth,startDay] = searchParamsStartDate.split('-')
        startDate = [startDay,startMonth,startYear].join('/')
    }
    else {
        titleReport = 'Favor informar data de início!'
    }
    if (searchParamsEndDate) {
        const [endYear,endMonth,endDay] = searchParamsEndDate.split('-')
        endDate = [endDay,endMonth,endYear].join('/')
    }
    else {
        titleReport = 'Favor informar data final!'
    }
    
    if (searchParamsStartDate && searchParamsEndDate) {
        titleReport = `Índice Nacional de Preços ao Consumidor Amplo entre os dias ${startDate} e ${endDate}`
    }


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


    return(
        <div className="report-ipca">
            <h4 className="title">{titleReport}</h4>
            <ReportPage reports={reports} />
            
        </div>
    )

}
export default Report;