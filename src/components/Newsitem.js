import React, { Component } from 'react'

const Newsitem =(props)=> {
 

    let {title, description , imageurl, newsurl, auther , time}= props;
    return (
      <div >
        <div className="card" style={{width: "18rem"}}>
         <img src={imageurl==null? "https://c.ndtvimg.com/2023-05/h9qgj31g_rahul-gandhi-scooter_625x300_07_May_23.jpg":imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small>By {auther==null?"Unknown":auther} at {time}</small></p>
        <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">read more</a>
        </div>
        </div>
      </div>
    )
  
}

export default Newsitem;
