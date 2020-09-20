import React from 'react';
import { CategoryCards } from '../components/CategoryCards';
import { HomeBanner } from '../components/Carousel'

export const Home = () => {

    return (
        <div>
            <HomeBanner />
            <br/><br/>
            <CategoryCards/>
        </div>
    )
}
