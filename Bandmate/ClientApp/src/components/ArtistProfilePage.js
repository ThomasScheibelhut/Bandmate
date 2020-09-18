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

export const ArtistProfilePage = () => {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        'https://localhost:44330/api/artists/' + useParams().id,
        []
    );

    return (
        <div>
            <div style={{ width: "20%", height: "20%" }}>
                <img src={useParams().id + ".jpg"} style={{ width: "100%", height: "100%" }} />
            </div>
            {data && <div>
                <div>{data.name}</div>
                <div>{data.city}, {data.state}</div>
                <div>{data.description}</div>
            </div>}
            <div>
                Contact
                
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
            </div>
            <CategoryCards />
            <div>
                {data.genres && data.genres.map((row) => (
                    <div>
                        {row.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
