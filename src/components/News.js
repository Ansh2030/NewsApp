import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
      country:'in',
      category:'general'
    }
  static propTypes={
    country: PropTypes.string,
    category:PropTypes.string,

  }

   constructor(props){
    super(props);
    console.log("hello constructor from news components");
    this.state={
      articles: [],
      loading: false,
      page: 1,
      totalResults : 0

    }
    document.title = ` NewesAdda-${this.props.category}`
   }

   async update(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    let data =  await fetch(url);
    let parsedata = await data.json();
    this.props.setProgress(50);
   this.setState({
    articles: parsedata.articles, 
    totalResults:parsedata.totalResults });

    this.props.setProgress(100);
   }
async componentDidMount(){
  this.props.setProgress(10);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pagesize}`;
   let data =  await fetch(url);
   let parsedata = await data.json();
  this.setState({
    articles: parsedata.articles, 
    totalResults:parsedata.totalResults 
  });
  this.props.setProgress(100);
}
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



fetchMoreData = async()=>{
  this.setState({
    page: this.state.page+1
  })
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
  let data =  await fetch(url);
  let parsedata = await data.json();
 this.setState({
  articles:this.state.articles.concat( parsedata.articles), 
  totalResults:parsedata.totalResults });
}


  render() {
    return (
      <>
      <h1 align="center">Top-HeadLines</h1>
         {this.state.loading && <Spinner/>}

         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className='container'>
        <div className='row'>
          {this.state.articles.map((element)=>{
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
}
