import React, { useState } from 'react';
import { CategoryFilterBar } from '../components/CategoryFilterBar';
import { CategoryDisplay } from '../components/CategoryDisplay';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'


export const CategoryPage = () => {

    const [filter, SetFilter] = useState('');

    const handleFilterChange = (type) => {
        SetFilter(type);
    }

    return (
        <div>
            <div>{useParams().category}</div>
            {filter}
            <CategoryFilterBar
                filter={handleFilterChange}
            />
            <CategoryDisplay
                category={useParams().category}
                filter={filter}
            />
        </div>
    )
}
