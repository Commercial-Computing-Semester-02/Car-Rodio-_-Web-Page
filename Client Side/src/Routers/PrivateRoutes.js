/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoute = (props) => {

    const { component: Component, ...rest } = props;
    if(localStorage.currentUser === undefined){

        Swal.fire({
            position: 'middle',
            icon: 'warning',
            title: 'You need to Login In first',
            showConfirmButton: false,
            timer: 2500
          })

        return (
            <Redirect to={'/auth'} />
        )
    }
    
    return (
        <div>
            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />
        </div>
    )
}

export default PrivateRoute
