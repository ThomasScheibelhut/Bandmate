import React from 'react';
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

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        `https://localhost:44330/api/${props.category}`,
        []
    );

    useEffect(() => {
        props.filter != '' && doFetch(`https://localhost:44330/api/${props.category}/genre/${props.filter}`);
    }, [props.filter])

    return (
        <div>
            <div>{data && props.category == "musicians" && data.slice(0, 9).map((musician, index) => (
                <Link to={`/musicians/${musician.musicianId}`} style={{ textDecoration: 'none' }}>
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
                </Link>
                ))
            }
            </div>
            <div>{data && props.category == "artists" && data.map((musician, index) => (
                <Link to={`/artists/${musician.musicianId}`} style={{ textDecoration: 'none' }}>
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
                </Link>
                ))
            }
            </div>
            <Button variant="outlined" style={{ backgroundColor: "white", color: "black" }}>
                &lt; Previous
                </Button>
            <Button variant="outlined" style={{ backgroundColor: "white", color: "black" }}>
                Next &gt;
            </Button>
        </div>
    )
}
