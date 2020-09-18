import React from 'react';
import { Link, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import SignIn from './SignIn';
import Modal from '@material-ui/core/Modal';
import { Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDataAPI } from '../components/useDataAPI';
import Avatar from '@material-ui/core/Avatar';

export const Navbar = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        `https://localhost:44330/api/musicians`,
        []
    );

    let history = useHistory();

    function handleClick(value) {
        history.push("musicians/" + value);
    }

    return (
        <div>
            <div style={{ backgroundColor: "purple", padding: "1%" }}></div>
            <h2>
                <Link to={"/"} style={{ textDecoration: 'none', fontFamily: 'Cookie', color:"black" }}>
                    Bandmate
                </Link>
            </h2>
            <Autocomplete
                options={data}
                getOptionLabel={() => ''}
                renderOption={option => (
                    <React.Fragment>
                        <Avatar src={option.musicianId + ".jpg"} />
                        <h4 style={{ paddingLeft: "2%", paddingRight: "2%" }} >{option.name} </h4>
                        {option.city}, {option.state}
                    </React.Fragment>
                )}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search" variant="outlined" />}
                style={{ width: "70%" }}
                onChange={(event, newValue) => {
                    if (newValue) {
                        history.push("/")
                        history.push("musicians/" + newValue.musicianId)
                    }
                }}
            />
            <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleOpen}
            >
                <StarBorderIcon />
            </IconButton>
            <IconButton
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleOpen}
            >
                <AccountCircleIcon />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Paper style={{
                    position: "fixed",
                    top: "20%",
                    left: "35%",
                }}>
                    <SignIn />
                </Paper>
            </Modal>
        </div>
    )
}
