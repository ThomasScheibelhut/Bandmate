import React from 'react';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { Switch, Route } from "react-router-dom";
import { CategoryPage } from './components/CategoryPage';
import { ProfilePage } from './components/ProfilePage';

export const App = () => {

    return (
        <div style={{ position: "relative", minHeight:"100vh", width:"100%" }}>
            <div style={{ paddingBottom:"3%" }}>
            <Navbar />
                <Switch>
                    <Route path="/musicians/:id">
                        <ProfilePage />
                    </Route>
                    <Route path="/:category/f/:genre">
                        <ProfilePage />
                    </Route>
                    <Route path="/:category">
                        <CategoryPage />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
            <div style={{ backgroundColor: "darkgray", position: "absolute", bottom: "0", width:"100%", padding:"3%" }}></div>
        </div>
    )
}
