import React from 'react';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Switch, Route } from "react-router-dom";
import { CategoryPage } from './components/CategoryPage';
import { MusicanProfilePage } from './components/MusicanProfilePage';
import { ArtistProfilePage } from './components/ArtistProfilePage';
import { VenueProfilePage } from './components/VenueProfilePage';
import SignIn from './components/SignIn';

export const App = () => {

    return (
        <div style={{ position: "relative", minHeight:"100vh", width:"100%" }}>
            <div style={{ paddingBottom: "9%" }}>
                <Navbar />
                <Switch>
                    <Route path="/signin">
                        <SignIn />
                    </Route>
                    <Route path="/venues/:id">
                        <VenueProfilePage />
                    </Route>
                    <Route path="/artists/:id">
                        <ArtistProfilePage />
                    </Route>
                    <Route path="/musicians/:id">
                        <MusicanProfilePage />
                    </Route>
                    <Route path="/:category/f/:genre">
                        <CategoryPage />
                    </Route>
                    <Route path="/:category">
                        <CategoryPage />
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
            <div style={{ backgroundColor: "darkgray", position: "absolute", bottom: "0", width:"100%", padding:"3%" }}></div>
        </div>
    )
}
