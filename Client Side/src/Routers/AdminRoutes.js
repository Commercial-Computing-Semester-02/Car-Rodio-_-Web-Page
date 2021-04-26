import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

const AdminRoute = (props) => {
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
            <Redirect to='/auth' />
        )
    }

    if(localStorage.currentUser != undefined && jwt_decode(localStorage.getItem('currentUser')).role !== "admin" ){

        Swal.fire({
            position: 'middle',
            icon: 'error',
            title: 'Not Authorized Access',
            showConfirmButton: false,
            timer: 2500
          })

        return (
            <Redirect to='/auth' />
        )
    }

    return (
        <div className={props.parentClass}>

            <Route
                {...rest}
                render={props => (
                    <Component {...props} />
                )}
            />

        </div>
    )
};
export default AdminRoute;
