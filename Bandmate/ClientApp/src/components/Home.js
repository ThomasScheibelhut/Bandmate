import React from 'react';
import { CategoryCards } from '../components/CategoryCards';
import Example from '../components/Carousel'

export const Home = () => {

    return (
        <div>
            <Example style={{ padding: "40px 100px" }} />
            <CategoryCards/>
            <div>list of articles</div>
        </div>
    )
}
