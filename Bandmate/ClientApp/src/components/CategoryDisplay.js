import React, { useState } from 'react';
import { useDataAPI } from '../components/useDataAPI';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const CategoryDisplay = (props) => {
    const classes = useStyles();

    const [pageStart, SetPageStart] = useState(0);
    const [pageEnd, SetPageEnd] = useState(12);

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        `https://localhost:44330/api/${props.category}`,
        []
    );

    const handlePageDown = () => {
        var number = pageStart - 12
        SetPageStart(number)
        number = pageEnd - 12
        SetPageEnd(number)
    }
    const handlePageUp = () => {
        var number = pageStart + 12
        SetPageStart(number)
        number = pageEnd + 12
        SetPageEnd(number)
    }

    useEffect(() => {
        props.filter != '' && doFetch(`https://localhost:44330/api/${props.category}/${props.filter}`);
    }, [props.filter])

    return (
        <div>
            <GridList cols={4}>
                {data.length > 0 && props.category == "musicians" && data.filter((month, idx) => idx >= pageStart && idx < pageEnd).map((musician, index) => (
                        <Link to={`/musicians/${musician.musicianId}`} style={{ textDecoration: 'none', height:"90%", padding:"1%" }}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={musician.profilePicture ? musician.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {musician.name}
                                    </Typography>
                                    <div>{musician.city}, {musician.state}</div>
                                    <div>{musician.genres.map((genre, i) => (
                                        <span>{genre.name}{i+1 != musician.genres.length && <span>, </span>}</span>
                                        ))}</div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))
                }
            </GridList>
            <GridList cols={4}>
                {data.length > 0 && props.category == "artists" && data.filter((month, idx) => idx >= pageStart && idx < pageEnd).map((artist, index) => (
                    <Link to={`/artists/${artist.artistId}`} style={{ textDecoration: 'none', height: "90%", padding: "1%" }}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={artist.profilePicture ? artist.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {artist.name}
                                    </Typography>
                                    <div>{artist.city}, {artist.state}</div>
                                    <div>{artist.genres.map((genre, i) => (
                                        <span>{genre.name}{i + 1 != artist.genres.length && <span>, </span>}</span>
                                    ))}</div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))
            }
            </GridList>
            <GridList cols={4}>
                {data.length > 0 && props.category == "venues" && data.filter((month, idx) => idx >= pageStart && idx < pageEnd).map((venue, index) => (
                    <Link to={`/venues/${venue.venueId}`} style={{ textDecoration: 'none', height: "90%", padding: "1%" }}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={venue.profilePicture ? venue.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {venue.name}
                                    </Typography>
                                    <div>{venue.city}, {venue.state}</div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link> 
                ))
            }
            </GridList>
            {!data.length && <div>No items found</div>}
            <Grid container direction="row" alignItems="center" justify="center">
                <Grid item style={{ padding: "2%" }}>
            {pageStart != 0 && <Button variant="outlined" onClick={handlePageDown} style={{ backgroundColor: "white", color: "black" }}>
                        &lt; Previous
                </Button>}
                    </Grid>
                <Grid item item style={{ padding: "2%" }}>
            {pageEnd < data.length && <Button variant="outlined" onClick={handlePageUp} style={{ backgroundColor: "white", color: "black" }}>
                        Next &gt;
            </Button>}
                </Grid>
            </Grid>
        </div>
    )
}
