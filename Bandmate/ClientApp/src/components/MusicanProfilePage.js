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

export const MusicanProfilePage = () => {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        'https://localhost:44330/api/musicians/' + useParams().id,
        []
    );

    let id = useParams().id

    useEffect(() => {
        doFetch('https://localhost:44330/api/musicians/' + id);
    }, [id])

    return (
        <div>
            <div style={{ width: "20%", height: "20%" }}>
                <img src={useParams().id + ".jpg"} style={{ width: "100%", height: "100%" }} />
            </div>
            {data && <div>
                <h2>{data.name}</h2>
                <div>{data.city}, {data.state}</div>
                <div>{data.description}</div>
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
                    {data.openToGigs ? "Open for Gigs": "Not available for Gigs"}
                    {data.openToRecording ? "Open for session work": "Not available for session work"}
                    {data.openToJoiningBands ? "Open to joining bands" : "Not available to join bands"}
                </div>
                <div>
                    {data.genres && data.genres.map((row) => (
                        <div>
                            {row.name}
                        </div>
                    ))}
                </div>
                <div>
                    {data.instruments && data.instruments.map((row) => (
                        <div>
                            {row.type}
                        </div>
                    ))}
                </div> 
                <div>
                    {data.artistsMusicians && data.artistsMusicians.map((row) => (
                        <div>
                            <Avatar src={data.musicianId + ".jpg"} />
                            <div>
                                {row.artist.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            <CategoryCards />
        </div>
    )
}
