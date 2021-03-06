﻿import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'
import { useDataAPI } from '../components/useDataAPI';

export const ProfileDisplay = () => {
    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        'https://localhost:44330/api/musicians/' + useParams().id,
        []
    );

    return (
        <div>
            <div style={{ width: "20%", height: "20%" }}>
                <img src={useParams().id + ".jpg"} style={{ width: "100%", height: "100%" }} />
            </div>
            {data &&<div>
                <div>{data.name}</div>
                <div>{data.city}, {data.state}</div>
                <div>{data.description}</div>
            </div>}
        </div>
    )
}
