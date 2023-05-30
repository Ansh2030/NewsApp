import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
 Routes,
  Route,
} from "react-router-dom";

const App=()=> {
 const  api = process.env.REACT_APP_API;

  const [state, setState] = useState({ progress: 0});
// const state={
//   progress:0
// }

const setProgress= (progress)=>{
 setState({progress:progress});
}


  
    return (
      <Router>
      <div>
        
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={state.progress}
      />

      <Routes>
        <Route path="/sports" element={ <News setProgress=  {setProgress}  key="sporst"  apikey ={api } pagesize={6} country="in" category="sports"/>}/>
        <Route path="/entertainment" element={ <News setProgress=  {setProgress}  key="enter"  apikey ={api } pagesize={6} country="in" category="entertainment"/>}/>
        <Route path="/business" element={ <News setProgress=  {setProgress}  key="buss" pagesize={6}  apikey ={api } country="in" category="business"/>}/>
        <Route path="/" element={ <News setProgress=  {setProgress}  key="gen" pagesize={6} country="in"  apikey ={api } category="general"/>}/>
        <Route path="/technology" element={ <News setProgress=  {setProgress}  key="tech" pagesize={6}  apikey ={api } country="in" category="technology"/>}/>
        <Route path="/science" element={ <News setProgress=  {setProgress}  key="sci" pagesize={6}  apikey ={api } country="in" category="science"/>}/>
        <Route path="/health" element={ <News setProgress=  {setProgress}  key="health" pagesize={6}  apikey ={api } country="in" category="health"/>}/>


       
       
      </Routes>
     
      </div>
      </Router>
    )
  
}

export default App;
//459d2494bfd645bdaf24fc2236d4ed11