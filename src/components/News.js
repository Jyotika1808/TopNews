import React, { Component } from 'react'
import NewsItem from '../NewsItem'
import '../App.css';
import people from './people.gif'
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import logo from './logo.png'
// import Dat from './Dat';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 7,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  // capitalize function = to make first letter of title capital
  capitalizefirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Constructor here! from news component")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }

    document.title = `${this.capitalizefirst(this.props.category)} - DailyNews`
  }

  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7abc31c612484a4f8f0c32fc0811c7fd
    &page=${this.state.page}&pageSize=${this.props.pageSize}`
    // loading is true when frst reqst is send for loading of data
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      // loading becomes false when app is just started
      loading: false
    })
    this.props.setProgress(100)
  }

  async componentDidMount() {
    this.updateNews()
  }

  handlePrev = async () => {
    //     console.log("previus")

    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7abc31c612484a4f8f0c32fc0811c7fd&language=en&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    //     // loading is true at time of loading data for spinner
    //     this.setState({ loading: true })
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData)
    // // loading becomes false when data is uploded successfully for sppinner
    //     this.setState({
    //       page: this.state.page - 1,
    //       articles: parsedData.articles,
    //       loading : false
    //     })
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  handleNext = async () => {
    console.log("next")

    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)))
    // {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7abc31c612484a4f8f0c32fc0811c7fd&language=en&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    // // when data is coming loading is true down
    // this.setState({ loading: true })
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // // as data arrived loading becomes false up


    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading : false
    // })
    // }
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }

  fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7abc31c612484a4f8f0c32fc0811c7fd&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    // loading is true when frst reqst is send for loading of data
    this.setState({ page: this.state.page + 1 })

    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,


    })
  };

  render() {

    return (
      <>
        
        let d = new Date();
        let dat = d.getDate();
        console.log(dat);
        <div className="head" style={{ display: 'flex' }}>
       console.log(today)

          <img src={logo} alt="Unable to load image..." className="logo" />
          <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '80px', fontFamily: 'times new roman', fontSize: '50px' }}> DailyNews - Top {this.capitalizefirst(this.props.category)} Headlines</h1>

          {this.state.loading && <Spin />}
        </div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spin />} >

          <div className='container'>

            <div className="row">
              <img className='my-5 peoples' src={people} alt="loading" />

              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>

                  <NewsItem title={element.title ? element.title.slice(0, 50) : " "} description={element.description ? element.description.slice(0, 150) : " "}
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

    )
  }
}
export default News





