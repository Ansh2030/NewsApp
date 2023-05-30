import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News =(props)=> {
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [page, setpage]= useState(1);
  const[ totalResults, settotalresults] = useState(0);
 
  /* constructor(props){
    super(props);
    console.log("hello constructor from news components");
    this.state={
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0

    }}*/
   
   

   const  update= async()=>{
   props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
    let data =  await fetch(url);
    let parsedata = await data.json();
   props.setProgress(50);
   setArticles( parsedata.articles);
   settotalresults(parsedata.totalResults);
  //  this.setState({
  //   articles: parsedata.articles, 
  //   totalResults:parsedata.totalResults });

   props.setProgress(100);
   }

   useEffect(()=>{
        update();
         document.title = ` NewesAdda-${props.category}`
   },[]);

/*
async componentDidMount(){
 props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pagesize}`;
   let data =  await fetch(url);
   let parsedata = await data.json();
  this.setState({
    articles: parsedata.articles, 
    totalResults:parsedata.totalResults 
  });
 props.setProgress(100);
}*/
/*
handlenextclick= async()=>{
console.log("nextclicked");
// if(!(Math.ceil((this.state.totalResults)/(this.props.pagesize))<(this.state.page+1))){
/*
let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
this.setState({loading:true});
let data =  await fetch(url);
let parsedata = await data.json();
this.setState({
  page: this.state.page +1,
  articles: parsedata.articles,
  loading:false
});
 this.setState({
  page: this.state.page +1
 })
 this.update();
}


handleprevclick= async()=>{
console.log("prev clicked");
/*let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={this.props.apikey}&page=${this.state.page-1}&pagesize=${this.props.pagesize}`;
this.setState({loading:true});
let data =  await fetch(url);
let parsedata = await data.json();
this.setState({
  page: this.state.page -1,
  articles: parsedata.articles,
  loading: false
});
this.setState({
  page: this.state.page +1
 })
 this.update();
}*/



const fetchMoreData = async()=>{
 
  /*this.setState({
    page: this.state.page+1
  })*/
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;
  setpage(page+1);
  let data =  await fetch(url);
  let parsedata = await data.json();
  setArticles(articles.concat( parsedata.articles));
  settotalresults(parsedata.totalResults);
//  this.setState({
//   articles:this.state.articles.concat( parsedata.articles), 
//   totalResults:parsedata.totalResults });
}



    return (
      <>
      <h1 align="center">Top-HeadLines</h1>
         {loading && <Spinner/>}

         <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className='container'>
        <div className='row'>
          {articles.map((element)=>{
            return  <div className='col-md-4'  key={element.url}>
            <Newsitem title={element.title?element.title:" "} description={element.title?element.description:" "} imageurl={element.urlToImage} newsurl={element.url} auther={element.author} time={element.publishedAt}/>
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>

        { /* <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1} class=" btn btn-primary" onClick={this.handleprevclick}>Previous</button>
        <button type="button" disabled={Math.ceil((this.state.totalResults)/(this.props.pagesize))<(this.state.page+1)} className="btn btn-primary" onClick={this.handlenextclick}>Next</button>
          </div>*/}
       
    
      </>
    )
  
}

const defaultProps = {
  country:'in',
  category:'general'
}
const  propTypes={
country: PropTypes.string,
category:PropTypes.string,

}

export default News;