import API from './Base';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';

export const postService = {
    GetBrands,
    GetAllPosts, // Get all posts, status = Approved(true) or status = Not Approved(false)
    GetPostsList, // Get list of posts according to the user, uid = someuserid
    GetPost, // Get particular post by it's id, pid = somepostid
    GetPostForForm,
    GetImages,
    DeletePost, // Delete a post, pid = somepostid
    CreatePost, // Create a post with fields values (initially status should be false)
    AcceptPost, // Change it's approved status to true
    RejectPost,
    SendImages,
    GetPostsWithImages,
    AddComment,
    GetComments
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
        year: fields.year,
        fuel: fields.fuel,
        miles: fields.miles,
        description: fields.description,
        region: fields.region,
        city: fields.city,
        address: fields.address,
        name: fields.name,
        contact: fields.contact,
        email: fields.email,
        uid: jwt_decode(localStorage.getItem('currentUser')).u_id,
    },{})

    return request
}

function GetPost(pid){
    const [state, setState] = useState({
        post: null
    })
    useEffect(() => {
        API.get('/advertistments/advertistment/'+pid)
        .then(function(response){
            setState({
                post: response.data.data
            }) 
        })
    },[])
    return state
}

function GetPostForForm(pid){
    return API.get('/advertistments/advertistment/'+pid)
}


function GetImages(pid){
    const [state, setState] = useState({
        image: []
    })
    useEffect(() => {
        API.get('/advertistments/get-images/'+pid)
        .then(function(response){
            setState({
                image: response.data.data
            }) 
        })
    },[])
    return state
}


function GetPostsList(){
    const [state, setState] = useState({
        posts: []
    })
    console.log(jwt_decode(localStorage.getItem('currentUser')).u_id)
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


function GetComments(postid){
    const [state, setState] = useState({
        comments: []
    })
    useEffect(() => {
        API.get('/comments/get-for-post/'+postid)
        .then(function(response){
            setState({
                comments: response.data.data
            }) 
        })
    },[])
    
    return state 
}

function AddComment(message, postid){
    const request = API.post('/comments',{
        commentedby: jwt_decode(localStorage.getItem('currentUser')).u_id,
        message: message,
        postId: postid
    })
    return request
}
