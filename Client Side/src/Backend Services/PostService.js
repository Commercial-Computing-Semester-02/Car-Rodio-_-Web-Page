/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import API from './Base';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';

export const postService = {
    GetBrands,
    GetAllPosts, // Get all posts, status = Approved(true) or status = Not Approved(false)
    GetPostsList, // Get list of posts according to the user, uid = someuserid
    GetPost, // Get particular post by it's id, pid = somepostid
    DeletePost, // Delete a post, pid = somepostid
    CreatePost, // Create a post with fields values (initially status should be false)
    AcceptPost, // Change it's approved status to true
    RejectPost,
    SendImages,
    GetPostsWithImages
};


function GetBrands(){
    const [state, setState] = useState({
        brands: []
    })
    useEffect(() => {
        API.get('/brands')
        .then(function(response){
            console.log(response)
            setState({
                brands: response.data.data
            }) 
        })
    },[])
    return state
}

function GetAllPosts(approve=0, reject=0){
    const [state, setState] = useState({
        posts: []
    })
    useEffect(() => {
        API.post('/advertistments/search',{
            approved: approve,
            rejected: reject,
        },{})
        .then(function(response){
            setState({
                posts: response.data.data
            }) 
        })
    },[])
    return state   
}


function CreatePost(fields){
    const request = API.post('/advertistments',{
        title: fields.title,
        price: fields.price,
        conditions: fields.conditions,
        transmission: fields.transmission,
        model: fields.model,
        brand: fields.brand,
        colour: fields.colour,
        years: fields.years,
        fuel: fields.fuel,
        miles: fields.miles,
        description: fields.description,
        region: fields.region,
        city: fields.city,
        address: fields.address,
        seller_name: fields.seller_name,
        contact: fields.contact,
        uid: jwt_decode(localStorage.getItem('currentUser')).u_id,
    },{})

    return request
}

function GetPost(pid){
    const request = API.get('/advertistments/advertistment/'+pid)
    return request
}

function GetPostsList(uid){
    const [state, setState] = useState({
        posts: []
    })
    useEffect(() => {
        API.post('/advertistments/search',{
            uid: jwt_decode(localStorage.getItem('currentUser')).u_id
        },{})
        .then(function(response){
            setState({
                posts: response.data.data
            }) 
        })
    },[])
    return state  
}

function SendImages(uid, form_data){
    const request = API.post('/advertistments/upload/'+uid, form_data)
    return request
}

function GetPostsWithImages(){
    const [state, setState] = useState({
        posts: []
    })
    useEffect(() => {
        API.get('/advertistments/get-ads-image')
        .then(function(response){
            setState({
                posts: response.data.data
            }) 
        })
    },[])
    return state 
}


function AcceptPost(id){
    const request = API.put('/advertistments/advertistment/'+id,{
        approved: 1
    },{})
    .then(function(response){
        API.put('/advertistments/advertistment/'+id,{
            rejected: 0
        },{})
    })
    return request
}

function RejectPost(id){
    const request = API.put('/advertistments/advertistment/'+id,{
        approved: 0
    },{})
    .then(function(response){
        API.put('/advertistments/advertistment/'+id,{
            rejected: 1
        },{})
        
    })
    return request
}


function DeletePost(id){
    const request = API.delete('/advertistments/advertistment/'+id)
    return request
}