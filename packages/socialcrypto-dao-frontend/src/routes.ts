import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './home/index'

function RoutesComponent() {
    return (
        <Routes>
            <Route 
                exact
                path = '/'
                element = {<Home/>}
        </Routes>      
    );
    
}

export default RoutesComponent;
