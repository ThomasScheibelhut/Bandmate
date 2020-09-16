import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const CategoryFilterBar = (props) => {
    const classes = useStyles();

    return (
        <div>
            Genres
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem button
                    onClick={() => props.filter("rock")}
                    divider
                >
                    <ListItemText primary="Rock" />
                </ListItem>
                <ListItem button
                    onClick={() => props.filter("Country")}
                    divider
                >
                    <ListItemText primary="Country" />
                </ListItem>
                <ListItem button
                    onClick={() => props.filter("Metal")}
                    divider
                >
                    <ListItemText primary="Metal" />
                </ListItem>
                <ListItem button
                    onClick={() => props.filter("Jazz")}
                    divider
                >
                    <ListItemText primary="Jazz" />
                </ListItem>
                <ListItem button
                    onClick={() => props.filter("Folk")}
                    divider
                >
                    <ListItemText primary="Folk" />
                </ListItem>
                <ListItem button
                    onClick={() => props.filter("hiphop")}
                    divider
                >
                    <ListItemText primary="Hip-Hop" />
                </ListItem>
            </List>
        </div>
    )
}
