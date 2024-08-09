import React from 'react';
import {Navigate} from 'react-router-dom';

const SessionRouteComp = ({children}) => {
    const isAuthenticated = !!
    localStorage.getItem('token4');

    return isAuthenticated ? children : <Navigate to="/AdminLogin" />;

};
export default SessionRouteComp;