import React, { useState } from 'react';
import { useDataAPI } from '../components/useDataAPI';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { Button } from '@material-ui/core';


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
    const [pageEnd, SetPageEnd] = useState(9);

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        `https://localhost:44330/api/${props.category}`,
        []
    );

    const handlePageDown = () => {
        var number = pageStart - 10
        SetPageStart(number)
        number = pageEnd - 10
        SetPageEnd(number)
    }
    const handlePageUp = () => {
        var number = pageStart + 10
        SetPageStart(number)
        number = pageEnd + 10
        SetPageEnd(number)
    }

    useEffect(() => {
        props.filter != '' && doFetch(`https://localhost:44330/api/${props.category}/${props.filter}`);
    }, [props.filter])

    return (
        <div>
            <div>{data && props.category == "musicians" && data.map((musician, index) => ( 
                <div>
                    {index >= pageStart && index < pageEnd && <Link to={`/musicians/${musician.musicianId}`} style={{ textDecoration: 'none' }}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={musician.profilePicture ? musician.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {musician.name}
                                        <div>{musician.city}, {musician.state}</div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>}
                </div>
            ))
            }
            </div>
            <div>{data && props.category == "artists" && data.map((artist, index) => (
                <div>
                    {index >= pageStart && index < pageEnd && <Link to={`/artists/${artist.artistId}`} style={{ textDecoration: 'none' }}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={artist.profilePicture ? artist.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {artist.name}
                                        <div>{artist.city}, {artist.state}</div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>}
                </div>
                ))
            }
            </div>
            <div>{data && props.category == "venues" && data.map((venue, index) => (
                <div>
                    {index >= pageStart && index < pageEnd && <Link to={`/venues/${venue.venueId}`} style={{ textDecoration: 'none' }}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={venue.profilePicture ? venue.profilePicture : "untitled.jpg"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {venue.name}
                                        <div>{venue.city}, {venue.state}</div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>}
                </div>
                ))
            }
            </div>
            {pageStart != 0 && <Button variant="outlined" onClick={handlePageDown} style={{ backgroundColor: "white", color: "black" }}>
                &lt; Previous
                </Button>}
            {pageEnd < data.length && <Button variant="outlined" onClick={handlePageUp} style={{ backgroundColor: "white", color: "black" }}>
                Next &gt;
            </Button>} 
        </div>
    )
}
