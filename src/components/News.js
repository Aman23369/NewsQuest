import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor(){
    super();
    console.log("Hello i am a constructor from news component");
    this.state={
      articles:[],
      loading:false,
      page:1
    }
  }

  async componentDidMount()
  {
     //let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5c034135fa374acba9c6cd4caf1ab90f&page=1&pageSize=20`;
     let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c034135fa374acba9c6cd4caf1ab90f";
     this.setState({loading:true})
     let data= await fetch(url);
     let parsedData= await data.json()
     this.setState({articles:parsedData.articles, totalResults: parsedData.totalResults,loading:false})
  }

  handlePrevClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=957491e647f3452e812b0334947d9a77&page=${this.state.page-1}&pageSize=20`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json()

    this.setState({
      page:this.state.page-1,
      articles: parsedData.articles,
      loading:false
    })
  }
  
  handleNextClick=async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=957491e647f3452e812b0334947d9a77&page=${this.state.page+1}&pageSize=20`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json()

    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading:false
    })
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '85px'}}>NewsQuest - Top Headlines from {this.props.category}</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-4">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })} 
            <div className="container d-flex justify-content-between my-4">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> 
        </div>
      </div>
    )
  }
}

export default News