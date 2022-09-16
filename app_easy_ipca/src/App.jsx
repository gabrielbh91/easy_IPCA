import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar"


function App() {
  return (
    <div id="main_page" className="App">
        <Navbar />
        <h2>Relatório IPCA Banco Central do Brasil</h2>
        <Outlet />
      </div>
 );
}

export default App;
