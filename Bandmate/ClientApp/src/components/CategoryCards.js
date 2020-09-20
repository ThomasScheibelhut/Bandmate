import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const CategoryCards = () => {
    const classes = useStyles();

    return (
        <Grid container justify="space-around">
            <Grid item style={{ width: "20%"  }}>
                <Link to="/musicians" style={{ textDecoration: 'none' }}>
            <Card className={classes.root} >
                <CardActionArea >
                    <CardMedia
                        className={classes.media}
                                image="https://images.unsplash.com/photo-1471565661762-b9dfae862dbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                        title="Contemplative Reptile"
                        style={{ width: '100%' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Musicians
          </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                </Link>
            </Grid>
            <Grid item style={{ width: "20%" }}> 
                <Link to="/artists" style={{ textDecoration: 'none' }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                                image="https://images.unsplash.com/photo-1558172307-38630645e7f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Artists
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Link>
            </Grid>
            <Grid item style={{ width: "20%" }}>
            <Link to="/venues" style={{ textDecoration: 'none' }}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                                image="https://images.unsplash.com/photo-1507901747481-84a4f64fda6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Venues
          </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
                </Link>
            </Grid>
        </Grid>
    )
}
