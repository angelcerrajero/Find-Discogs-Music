import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Icon} from 'antd';
import '../styles/styles.css';
import Grid from '@material-ui/core/Grid';

const { Meta } = Card;


export default class DataList extends Component {

render() {
    return (
    <React.Fragment>

            <div style={{flexGrow: "1"}}>
                <Grid container spacing={3}>
                {this.props.artist.map(artist => 
                    (
                    <Grid item xs={12} sm={4} md={3} key={artist.id}>
                        {
                            artist.thumb === "" || artist.thumb === "https://img.discogs.com/cbc5a1b7d0f68e0a7ef0eaf7f546076877e4f41b/images/warning.png" ?
                            <Link to={`/detail/${artist.id}`}><Card
                            // hoverable = 'true'
                            key={artist.id}
                            style={{ padding: "10px" }}
                            cover={<img alt="" src='https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg' />}
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="edit" key="edit" />,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title={artist.title}
                                
                            />
                        </Card> 
                        </Link>

                        :
                    
                        <Link to={`/detail/${artist.type}/${artist.id}`}><Card
                            
                            // hoverable = 'true'
                            key={artist.id}
                            style={{ padding: "10px" }}
                            cover={<img alt="" src={artist.thumb} />}
                            actions={[
                                <Icon type="setting" key="setting" />,
                                <Icon type="edit" key="edit" />,
                                <Icon type="ellipsis" key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title={artist.title}
                                
                            />
                        </Card> 
                        </Link>
                        }
                        
                    </Grid>
                ))}
                </Grid> 

            </div>          
    </React.Fragment>
  );
  }
}