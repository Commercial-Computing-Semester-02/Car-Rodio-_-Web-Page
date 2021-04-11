/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

// Put base URL here
const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Change here as you want
if(currentUserSubject.value){
    API.defaults.headers.common['Authorization'] = currentUserSubject.value.token;
}

export default API;