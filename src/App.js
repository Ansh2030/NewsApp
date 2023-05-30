import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
 Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {
  api = process.env.REACT_APP_API;
state={
  progress:0
}

setProgress= (progress)=>{
 this.setState({progress:progress});
}


  render() {
    return (
      <Router>
      <div>
        
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

      <Routes>
        <Route path="/sports" element={ <News setProgress=  { this.setProgress}  key="sporst"  apikey = {this.api} pagesize={6} country="in" category="sports"/>}/>
        <Route path="/entertainment" element={ <News setProgress=  { this.setProgress}  key="enter"  apikey = {this.api} pagesize={6} country="in" category="entertainment"/>}/>
        <Route path="/business" element={ <News setProgress=  { this.setProgress}  key="buss" pagesize={6}  apikey = {this.api} country="in" category="business"/>}/>
        <Route path="/" element={ <News setProgress=  { this.setProgress}  key="gen" pagesize={6} country="in"  apikey = {this.api} category="general"/>}/>
        <Route path="/technology" element={ <News setProgress=  { this.setProgress}  key="tech" pagesize={6}  apikey = {this.api} country="in" category="technology"/>}/>
        <Route path="/science" element={ <News setProgress=  { this.setProgress}  key="sci" pagesize={6}  apikey = {this.api} country="in" category="science"/>}/>
        <Route path="/health" element={ <News setProgress=  { this.setProgress}  key="health" pagesize={6}  apikey = {this.api} country="in" category="health"/>}/>


       
       
      </Routes>
     
      </div>
      </Router>
    )
  }
}
//459d2494bfd645bdaf24fc2236d4ed11