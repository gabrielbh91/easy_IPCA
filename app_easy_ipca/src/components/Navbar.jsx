import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {BsSearch} from "react-icons/bs"

import "./Navbar.css"


const Navbar = () => {
  const [startDate, setSearchStartDate] = useState("")
  const [endDate, setSearchEndDate] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    let urlReport = '/report?'
    let urlParams = []
    if(startDate) urlParams.push(`startdate=${startDate}`)
    if(endDate)urlParams.push(`enddate=${endDate}`)

    urlReport += urlParams.join('&')
    
    navigate(urlReport)

  }

    return (
    <nav id="navbar">
        <h1>
          <Link to="/">EasyIPCA</Link>
        </h1>
        <form onSubmit={handleSubmit}>
            <label for="dataInicial">Data Inicial:</label>
            <input id="dataInicial" type="date" onChange={(e) => setSearchStartDate(e.target.value)} value={startDate}/>
            <label for="dataFinal">Data Final:</label>
            <input id="dataFinal" type="date" onChange={(e) => setSearchEndDate(e.target.value)} value={endDate}/>
            <button type="submit"><BsSearch /></button>
        </form>
        <button type="submit">Atualizar Base</button>
      </nav>
    )
}

export default Navbar