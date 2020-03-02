import React from 'react';
import { Link } from "react-router-dom";
import '../styles/styles.css'
import {Spin } from 'antd';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from 'antd';
import { withSnackbar } from 'notistack';
import Typography from '@material-ui/core/Typography';
import '../styles/bulma.css';
import api from '../utils/api'



const { findArtistByID, findReleaseByID, addToMyCollection } = api();

class DetailAd extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      data: {},
      isLoading: false,
    }
    
  }

  componentDidMount(){
    const {type, id} = this.props.match.params
    if(type === "artist"){
        findArtistByID(id).then(artist => this.setState({
            data: artist,
            isLoading: true
        }))
    }else{
        findReleaseByID(id).then(release => this.setState({
            data: release,
            isLoading: true
        }))

    } 
  }


 newCollection = () => {
    const id = this.state.data.id
    addToMyCollection(id).then(res => {
            this.props.enqueueSnackbar('Added to Collection', {variant: 'success'});
      })
 }

  render(){

    const data = this.state.data
    const isLoading = this.state
    const image = data && data.images && data.images[0] && data.images[0].uri

    //CONTROL OF SPINNER AND DATA
    if (!data || isLoading === true || !image) {
        return (
          <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Spin tip="Loading..." size="large" />
          </div>
        )
      }

       return(
        
        <React.Fragment>
            {
                this.props.match.params.type === 'artist' ?
                //////////// ARTIST CARD START ///////////////////////////
                <div className="detailPage">
            <Card className="card-material-music">
                
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                {data.name}
                <Typography  component="">Realname: {data.realname}</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {data.profile}
                </Typography>
            </CardContent>
            <CardMedia
                component="img"
                alt="image"
                image={image}
                title="artist.image"
                className="artistImage"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                Albums and Releases: 
                <br></br>
                <a href={`${data.uri}`} >{data.uri}</a>
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" color="primary">
                Share
            </Button>
            <Link to={`/search/`} ><Button size="small" color="primary">
                Go back
            </Button></Link>
            </CardActions>
        </Card>
      </div>
      //////////// ARTIST CARD END ///////////////////////////
      :
      
      //////////// RELEASE CARD START ///////////////////////////
      <div className="detailPage">
      <Card className="card-material-music">
          
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {data.title}
          <Typography  component="">Artist: {data.artists_sort}</Typography>
          <Typography  component="">Released: {data.released}</Typography>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {data.notes}
          </Typography>
      </CardContent>
      <CardMedia
          component="img"
          alt="image"
          image={image}
          title="artist.image"
          className="artistImage"
      />
      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
          More info: 
          <br></br>
          <a href={`${data.uri}`} >{data.uri}</a>
      </Typography>
      </CardContent>
      <CardActions>
      <Button onClick={this.newCollection} size="small" color="primary">
        Add to My Collection
      </Button>
      <Link to={`/search/`} ><Button size="small" color="primary">
          Go back
      </Button></Link>
      </CardActions>
    </Card>
    </div>


      //////////// RELEASE CARD END ///////////////////////////
      
    }
        
      </React.Fragment>
        
        )
      }

  
  
}
export default withSnackbar(DetailAd);




