import React, { useState,useEffect } from 'react';
import { useRef } from 'react';
import { Switch,Route,Link,useParams } from 'react-router-dom'


//Home
const Climas = () => {
  const [paises, setPaises] = useState([]);
  const [search, SetSearch] = useState("");
  const [ciudad,SetCiudad] = useState();
  const ciudades = useRef();
  const [mes,SetMes] = useState();
  const meses = useRef();
const N = []


   const GetPais = () => {
    fetch(
      "https://raw.githubusercontent.com/michaelx/climate/master/climate.json"
    )
    //revisar esto en el Curso de Damian
      .then((response) => response.json())
      .then((paises) => {
        setPaises(paises); 
      })
      .catch((err) => console.log(err.message));
  };

  const Buscando = (event) => {
    SetSearch(event.target.value);      
  };

  const GetCiudad = ()=>{SetCiudad(ciudades.current.value)}
  const GetMes = ()=>{SetMes(meses.current.value)}

  useEffect(() => {
    GetPais();
    GetCiudad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cantidad de caracteres de lo que está escribiendo el usuario
  const p = search.length;

  return (
    <>
      <label>Seleccione País</label><br/>
      <input
        type="search"
        id=""
        country=""
        placeholder="Search..."
        onChange={Buscando}
      />
      {/*First of all ask if there is a search statement, 
      then if this is true, useing "slice" we search the same length 
      of the input value on the list of titles in the json*/}
      <select ref={ciudades} onChange={GetCiudad}>
      <option value="0">Elegir </option>
      {search ? 
          paises.filter((paises) =>paises.country.slice(0, p).toLowerCase() === search.toLowerCase())
      .map((paises, i) => (<option key={i} value={paises.id}>{paises.city}</option>
            )) : null}
          </select>
      {search ?    
      <select ref={meses} onChange={GetMes}>
      <option value="0" selected >Elegir</option>
      <option value="1">Enero</option>
      <option value="2">Febrero</option>
      <option value="3">Marzo</option>
      <option value="4">Abril</option>
      <option value="5">Mayo</option>
      <option value="6">Junio</option>
      <option value="7">Julio</option>
      <option value="8">Agosto</option>
      <option value="9">Septiembre</option>
      <option value="10">Octubre</option>
      <option value="11">Noviembre</option>
      <option value="12">Diciembre</option>     
      </select>
      : null}
      {ciudad>0 && mes > 0?
      paises.filter((paises) =>paises.id === parseFloat(ciudad)).map((paises, i) => (<Link to={"/clima/" + paises.id +'/'+ mes} key={i}><div style={{width:'100px', marginLeft:'3%',border:'2px solid black', display:'inline-block'}}> Ir </div></Link>))
      :null}
          {search ? (
        <ul>        
          {paises.filter((paises) =>paises.country.slice(0, p).toLowerCase().includes(search.toLowerCase())).map((paises,i) => <div style={{display:'none'}}>{N.push(paises.country)}</div>)}
          {N? N.sort().filter((value, index)=>value !== N.sort()[index + 1]).map((n,i)=><li key={i}>{n}</li>):null}
         
          </ul>) : null}

    </>
  );
};

const Ciudad = () => {
  const [clima, setClima] = useState([]);
  const {id} = useParams();
  let { mes } = useParams();
  const GetClima = () => {
    //*json estatico*
    fetch("https://raw.githubusercontent.com/michaelx/climate/master/climate.json")
      .then((response) => response.json())
      .then((clima ) => {
        setClima(clima);
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    GetClima();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  return (
    <div id="elegido">
      {/*clima.map((clima) => clima.id === params.id ? clima.monthlyAvg)}*/}
      
    {clima.filter((clima) =>clima.id === parseFloat(id)).map((clima, i) => (
      <>
    <h1>Pais: {clima.country}</h1>
    <h1>Ciudad: {clima.city}</h1>
    <h1>Mes: {meses[mes-1]}</h1>
    <h2>High: {clima.monthlyAvg[mes-1].high}</h2> 
    <h2>Low: {clima.monthlyAvg[mes-1].low}</h2>
    <h2>DryDays: {clima.monthlyAvg[mes-1].dryDays}</h2>
    <h2>SnowDays: {clima.monthlyAvg[mes-1].snowDays}</h2>
    <h2>Rainfall: {clima.monthlyAvg[mes-1].rainfall}</h2>
      </>
    ))
}  
      <Link to="/" id="bottonHome">
        <input type="button" value="Home" />
      </Link>
    </div>
  );
};

const Select = () => {
  return (
    <Route>
      <h1>
        <em>Searching clima</em>
      </h1>
      <Switch>
        <Route exact path="/">
          <Climas />
        </Route>
        <Route exact path="/clima/:id/:mes">
          <Ciudad />
        </Route>
      </Switch>
    </Route>
  );
};
export default Select;