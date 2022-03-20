import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/home/index'
import Projects from './pages/projects/index'
import Mint from './pages/mintForm/index'

function RoutesComponent() {
    return (
        <Routes>
            <Route 
            exact
            path = '/'
            element = {<Home/>}
            />
            <Route 
            exact
            path = '/projects'
            element = {<Projects/>}
            />
            <Route 
            exact
            path = '/mint'
            element = {<Mint/>}
            />
        </Routes>       
    );
    
}

export default RoutesComponent;