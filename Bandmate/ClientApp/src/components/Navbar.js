import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

export const Navbar = () => {

    return (
        <div>
            <div style={{ backgroundColor: "purple", padding: "1%" }}></div>
            <h2>
                <Link to={"/"} style={{ textDecoration: 'none', fontFamily: 'Cookie', color:"black" }}>
                    Bandmate
                </Link>
            </h2>
            <TextField id="outlined-basic" label="Search" variant="outlined" />
            <IconButton
                aria-label="show more"
                aria-haspopup="true"
            >
                <StarBorderIcon />
            </IconButton>
            <IconButton
                aria-label="show more"
                aria-haspopup="true"
            >
                <AccountCircleIcon />
            </IconButton>
        </div>
    )
}
