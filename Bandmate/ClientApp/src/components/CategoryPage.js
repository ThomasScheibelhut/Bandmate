import React, { useState } from 'react';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { CategoryDisplay } from '../components/CategoryDisplay';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';


export const CategoryPage = () => {

    const [filter, SetFilter] = useState('');

    const handleFilterChange = (type) => {
        SetFilter(type);
    }

    return (
        <div>
            <div style={{ backgroundColor: "purple", padding: "1%", color: "white", fontSize:"200%" }}>
                <Grid container alignItems="center" justify="center">
                    {useParams().category}
                </Grid>
            </div>
            <Grid container direction="row" alignItems="stretch">
                <Grid item style={{ padding:"2%", width: "15%"}}>
                    <CategoryFilterBar
                        filter={handleFilterChange}
                            />
                </Grid>
                <Grid item style={{ padding: "1%", width: "85%" }}>
                    <CategoryDisplay
                        category={useParams().category}
                        filter={filter}
                            />
                </Grid>
            </Grid>
        </div>
    )
}
