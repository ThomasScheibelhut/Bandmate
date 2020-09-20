import React from 'react';
import { CategoryCards } from '../components/CategoryCards';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import { Link } from "react-router-dom";

function Banner(props) {
    if (props.newProp) console.log(props.newProp)
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = ( 
        <Grid item xs={12 / totalItems} key="content" style={{ height: "100%" }}>
            <CardContent className="Content" style={{ backgroundColor: "purple", color: "white", height:"100%" }}>
                <Typography className="Title">
                    <h2>{props.item.Name}</h2>
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Link to={props.item.Link} style={{ textDecoration: 'none' }}>
                <Button variant="outlined" className="ViewButton" style={{ backgroundColor: "white", color: "black" }}>
                        View Now
                </Button>
                </Link>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className="Media"
                    image={item.Image} 
                    title={item.Name}
                    style={{ height: "100%", width: "100%" }}
                >
                </CardMedia>
            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner" style={{ height: "40vh" }}>
            <Grid container spacing={0} className="BannerGrid" style={{ height: "100%" }}>
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "Local Musicians",
        Caption: "Find other local musicians to play with!",
        contentPosition: "left",
        Link:"/musicians",
        Items: [
            {
                Name: " ",
                Image: "https://images.unsplash.com/photo-1565052161621-0f02dee7b3a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
            },
            {
                Name: " ",
                Image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            }
        ]
    },
    {
        Name: "Music for Everyone",
        Caption: "Check out locak bands and artists that fit your favorite genre!",
        contentPosition: "middle",
        Link: "/artists",
        Items: [
            {
                Name: "Washing Machine WX9102",
                Image: "https://images.unsplash.com/photo-1583906626580-72eee91dfbe6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            },
            {
                Name: "Learus Vacuum Cleaner",
                Image: "https://images.unsplash.com/photo-1578873375841-468b1557216f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
        ]
    },
    {
        Name: "Join Now!",
        Caption: "",
        contentPosition: "right",
        Link: "/signin",
        Items: [
            {
                Name: "Living Room Lamp",
                Image: "https://images.unsplash.com/photo-1583795059494-44bc7e53384c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            },
            {
                Name: "Floral Vase",
                Image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            }
        ]
    }
]

export const HomeBanner = () => {

    return (
        <Carousel
            className="HomeBanner"
            autoPlay={false}
            timer={1000}
            animation="fade"
            indicators={true}
            timeout={500}
            navButtonsAlwaysVisible={false}
            navButtonsAlwaysInvisible={false}
            style={{ color: "#494949" }}
        >
            {
                items.map((item, index) => {
                    return <Banner item={item} key={index} contentPosition={item.contentPosition} />
                })
            }
        </Carousel>
    )
}
