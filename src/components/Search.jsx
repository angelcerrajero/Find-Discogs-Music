import React from 'react';
import 'antd/dist/antd.css';
import '../styles/styles.css';
import { Layout, Breadcrumb, Input, Pagination, Spin } from 'antd';
import DataList from './DataList'
import MyCollectionList from './MyCollectionList'
import api from '../utils/api';
const { Content, Footer } = Layout;
const { Search } = Input;


const { findMusic, myCollection } = api();


export default class SearchArtist extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        artists: [],
        releases:  [],
        currentPage: 1,
        postsPerPage: 4,
        isLoading: false,
        myCollection: [],
        currentPagemyCollection: 1,
        postsPerPagemyCollection: 3,

      }
    };

  componentDidMount() {

      findMusic('lady gaga').then(artist => this.setState({
        artists: artist,
        isLoading: true
    }))

    myCollection().then(collection => this.setState({
        myCollection: collection,
        isLoading: true
    }))
  }

  onPageChange = (page) => {
    this.setState({
      currentPage: page,
    });

  }

  onPageChangeMyCollection = (page) => {
    this.setState({
      currentPagemyCollection: page,
    });

  }

  onInputChange = async (value) => {
    if (value !== ''){
      return await findMusic(value).then(artist => this.setState({
          artists: artist,
          currentPage: 1,
          isLoading: true,
      }))
    
  };
}

  render() {
    const artist = this.state.artists.results
    const myCollection = this.state.myCollection.releases
    
    //CONTROL OF SPINNER AND DATA
    const isLoading = this.state
    if (!artist || isLoading === true || !myCollection) {
      return (
        <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Spin tip="Loading..." size="large" />
        </div>
      )
    }


    // ARTIST PAGINATION CONFIGURATION
    const indexOfLastAds = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstAds = indexOfLastAds - this.state.postsPerPage;
    const currentArtist = artist.slice(indexOfFirstAds, indexOfLastAds);

    // MYCOLLECTION PAGINATION CONFIGURATION
    const indexOfLastCollection = this.state.currentPagemyCollection * this.state.postsPerPagemyCollection;
    const indexOfFirstCollection = indexOfLastCollection - this.state.postsPerPagemyCollection;
    const currentCollection = myCollection.slice(indexOfFirstCollection, indexOfLastCollection);
  
    return (
      <React.Fragment>
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
          <div style={{display: "flex", justifyContent: "center" }}>
              <Search
                style={{width: "60%"}}
                size="large"
                placeholder="Search Artist and Releases"
                onSearch={this.onInputChange}
                enterButton />
          </div>
          
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {
              artist ? 
              <DataList artist={currentArtist}></DataList>
              :
               <h2>No artist found</h2> 
              }
            </div>
            <Pagination style={{ display: 'flex', justifyContent: 'center', padding: "10px" }} onChange={this.onPageChange} current={this.state.currentPage} total={ Math.ceil(this.state.artists.results.length / this.state.postsPerPage)*10 } />
          </Content>

          
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}> My collection:
            <br></br>
            <br></br>
            {
              myCollection ? 
              <MyCollectionList artist={currentCollection}></MyCollectionList>
              :
               <h2>No artist found</h2> 
            }
            </div>
          </Content>
          <Pagination style={{ display: 'flex', justifyContent: 'center', padding: "10px" }} onChange={this.onPageChangeMyCollection} current={this.state.currentPageMyCollection} total={ Math.ceil(myCollection.length / this.state.postsPerPagemyCollection)*10 } />
          <Footer style={{ textAlign: 'center' }}>Artist Search by Angel</Footer>
        </Layout>,
      </React.Fragment>
    )
  }
}

