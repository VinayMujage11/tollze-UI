import React from 'react';
import {Navigate} from 'react-router-dom';

const SessionRouteComp = ({children}) => {
    const isAuthenticated = !!
    localStorage.getItem('token');

    return isAuthenticated ? children : <Navigate to="/LoginPage" />;

};
export default SessionRouteComp;