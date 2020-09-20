import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'
import { useDataAPI } from '../components/useDataAPI';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { CategoryCards } from '../components/CategoryCards';
import { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import { Link } from "react-router-dom";

export const ArtistProfilePage = () => {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        'https://localhost:44330/api/artists/' + useParams().id,
        []
    );

    let id = useParams().id

    useEffect(() => {
        doFetch('https://localhost:44330/api/artists/' + id);
    }, [id])

    return (
        <div style={{ padding: "3%", paddingLeft: "6%" }}>
            <Grid container direction="row" alignItems="stretch" justify="center">
                <Grid item style={{ width: "35%", height: "35%", paddingRight: "5%" }}>
                    <Paper style={{ paddingBottom: "100%", height: "0", position: "relative" }}>
                        {data && <img src={data.profilePicture} style={{ width: "100%", height: "100%", display: "block", position: "absolute" }} />}
                    </Paper>
                    <Paper style={{ alignContent: "center", paddingLeft: "5%", paddingBottom: "5%", backgroundColor: "slategray", color: "white" }}>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            aria-label="show more"
                            aria-haspopup="true"
                        >
                            <TwitterIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item style={{ width: "50%", height: "100%" }}>
                    {data && <div><Paper item style={{ padding: "3%", width: "100%", height: "100%", backgroundColor: "slategray", color: "white" }}>
                        <div><span style={{ fontSize: "200%" }}>{data.name}</span> - {data.city}, {data.state}</div>
                        <br/>
                        <div>{data.description}</div>
                        <div>
                        </div>
                        <div>{data.genres && data.genres.map((row) => (
                            <div>
                                {row.name}
                            </div>
                        ))}
                        </div>
                        <div> {data.instruments && data.instruments.map((row) => (
                            <div>
                                {row.type}
                            </div>
                        ))}
                        </div>
                    </Paper>
                        <br />
                        <Paper item style={{ padding: "1%", height: "100%", backgroundColor: "slategray", color: "white" }}>
                            Members:
                            <GridList row={1}>{data.artistsMusicians && data.artistsMusicians.map((row) => (
                            <Grid container direction="column" alignItems="center" justify="center">
                                <Grid item>
                                    <Link to={`/musicians/${row.musicianId}`} style={{ textDecoration: 'none' }}>
                                        <Avatar src={row.musician.profilePicture} style={{ width: "100px", height: "100px" }} />
                                    </Link>
                                </Grid>
                                <Grid item>
                                        <Link to={`/musicians/${row.musicianId}`} style={{ textDecoration: 'none', color: "white" }}>
                                            {row.musician.name}
                                    </Link>
                                </Grid>
                            </Grid>
                        ))}</GridList>
                            {data.artistsMusicians && data.artistsMusicians.length == 0 && <Grid container direction="column" alignItems="center" justify="center">
                                <Grid item>
                                    <br /><br />
                                    There are no musicians associated with this artist
                                    <br /><br />
                                </Grid>
                            </Grid>}
                        </Paper>
                    </div>}
                </Grid>
            </Grid>
            <br /><br />
            <Paper item style={{ padding: "2%", backgroundColor: "slategray", color: "white" }}>
                <h2>Explore More</h2>
                <CategoryCards />
            </Paper>
        </div>
    )
}