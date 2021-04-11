/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */

import React, { useState } from 'react';
import { authenticationService } from '../Backend Services/UserService';
import Footer from './Common/footer';
import { Modal } from 'react-bootstrap';
import jwt_decode from "jwt-decode";

function LayOut({page}){

    let role = false
    let user = { name: "Guest" }

    if(authenticationService.currentUserValue==null){
        role = false
    }else{
        role = true
        user = jwt_decode(localStorage.getItem('currentUser'))
    }
    
    console.log(user)

    const [profileModal, setProfileModal] = useState(false)
    const handleProfile = () => {
        setProfileModal(!profileModal)
    }

    return(
        <>
            <div>
                <nav class="navbar navbar-expand-lg fixed-top baseColor">
                    <a class="navbar-brand col-sm-3 col-md-2 mr-0 nav-link" href="/">Car Rodio</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">HOME <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/cars">CARS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/services">SERVICES</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/aboutus">ABOUT US</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/news">NEWS</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/contactus">CONTACT US</a>
                            </li>
                        </ul>
                    </div>
                    <ul class="navbar-nav ml-auto">
                        {role && <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <a class="dropdown-item" onClick={handleProfile}>Profile</a>
                                <a class="dropdown-item" onClick={authenticationService.logout} href="/">Logout</a>
                            </div>
                        </li>}
                        {!role && <a type="button" class="btn btn-outline-info" href="/auth">Log In</a>}
                        {!role && <a type="button" class="btn btn-outline-success ml-3 text-dark" href="/services">Post Your Add</a>}
                    </ul>
                </nav>

                <div id="layoutSidenav_content">
                    <main style={{marginTop: "3rem"}}>
                        {page}
                        <Footer/>
                    </main>
                </div>     
        </div>

        <Modal show={profileModal} style={{height: "100vh"}} >
            <Modal.Body style={{marginLeft: "26px", height: "104vh"}} >
                    <div class=" row d-flex justify-content-center" >
                        <div class="row m-l-0 m-r-0" style={{height: "70vh", borderRadius: "10px"}}>
                            <div class="col-sm-4 bg-dark">
                                <div class="card-block text-white">
                                    <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" /> </div>
                                    <h3 class="mb-5">{user.firstname + " " + user.lastname}</h3>
                                    <h5>Profile Info</h5>
                                    <h6 class="text-info">Wish List</h6>
                                    <h6 class="text-info">My Orders</h6>
                                    <h6 class="text-info">Favourite Store</h6>
                                    <h6 class="text-info">Messages</h6>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="card-block">
                                    <h4 class="m-b-20 p-b-5 b-b-default f-w-600">Profile Information</h4>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <p class="m-b-10 f-w-600">Name</p>
                                            <h6 class="text-muted">{user.firstname + " " + user.lastname}</h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <p class="m-b-10 f-w-600">Email</p>
                                            <h6 class="text-muted">{user.email}</h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <p class="m-b-10 f-w-600">Contact Number</p>
                                            <h6 class="text-muted">{user.contact_number}</h6>
                                        </div>
                                    </div>
                                    <hr/>
                                    <form>
                                        Current Password: <input type="text"/>
                                        New Password: <input type="text"/>
                                        Confirm Password: <input type="text"/>
                                    </form>
                                </div>
                                <button href="#" class="btnContact mb-3" onClick={handleProfile}>Submit</button>
                                <button href="#" class="btnContact" onClick={handleProfile}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    
            </Modal.Body>
        </Modal>
    </>
    )
}


export default LayOut;