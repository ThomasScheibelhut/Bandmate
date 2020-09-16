import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'
import { ProfileDisplay } from '../components/ProfileDisplay';


export const ProfilePage = () => {

    return (
        <div>
            <ProfileDisplay/>
        </div>
    )
}
