/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

export class PublicRoute extends React.Component {
    render() {
        let redirect = null;
        return (
            <Route
                {...this.props}
                render={props =>
                    !redirect ? <Component {...props} /> : <Redirect to={redirect}/>
                }
            />
        );
    }
}

export default PublicRoute