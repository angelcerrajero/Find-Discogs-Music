import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'antd';
import '../styles/styles.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default class DataList extends Component {

render() {

    return (
    <React.Fragment>

            <div style={{flexGrow: "1"}}>
                <Grid container spacing={3}>
                {this.props.artist.map(artist => 
                    (
                    <Grid item xs={12} sm={4} md={3} key={artist.id}>    
                        <Link to={`/detail/${artist.type}/${artist.id}`}>
                                <Card className="card-myCollection" variant="outlined">
                                    <CardContent>
                                        <Typography className="title-myCollection" color="textSecondary" gutterBottom>
                                            {artist.basic_information.year}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {artist.basic_information.title}
                                        </Typography>
                                        <Typography variant="overline" color="textSecondary">
                                            Genres:
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {
                                                artist.basic_information.genres.map(genre =>{
                                                    return(
                                                    <Button size="small" color="primary" key={genre} >{genre}</Button>
                                                    )
                                                })
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                        </Link>                        
                    </Grid>
                ))}
                </Grid> 

            </div>          
    </React.Fragment>
  );
  }





}