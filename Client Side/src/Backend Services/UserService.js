/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import { BehaviorSubject } from 'rxjs';
import API from './Base';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function register(userDetails) {
    const request = API.post('/users/signup',{
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        contact_number: userDetails.tpnumber,
        email: userDetails.email,
        password: userDetails.password,
        password2: userDetails.repassword,
    })
    request
        .then(function(response){
            localStorage.setItem('currentUser', JSON.stringify(response.data.token))
            API.defaults.headers.common['Authorization'] = response.data.token
            currentUserSubject.next(response.data)
        })
    return request
}

function login(userDetails){
    const request = API.post('/users/login',{
        email: userDetails.email,
        password: userDetails.password
    })
    request
        .then(function(response){
            localStorage.setItem('currentUser', JSON.stringify(response.data.token))
            API.defaults.headers.common['Authorization'] = response.data.token
            currentUserSubject.next(response.data)
        })
    return request
}


function logout() {
    if(authenticationService.currentUserValue!=null){
        localStorage.removeItem('currentUser')
        currentUserSubject.next(null)
    }
}