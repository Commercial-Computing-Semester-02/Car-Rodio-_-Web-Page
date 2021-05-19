import React from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../Components/Home/home";
import LayOut from "../Components/layout";
import Login from "../Components/Login/login";
import PublicRoute from "./PublicRoutes";
import { createBrowserHistory } from 'history';
import Register from "../Components/Login/register";
import Aboutus from "../Components/AboutUs/aboutus";
import Contactus from "../Components/ContactUs/contactus";
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoutes";
import AdminLayout from "../Components/adminlayout";
import PublishAds from "../Components/Services/PublishAds";
import AdminAds from "../Components/Admin/AdminAds";
import PendingAds from "../Components/Admin/PendingAds";
import CarLayout from "../Components/Cars/carlayout";
import RejectedAds from "../Components/Admin/RejectedAds";
import CarDetails from "../Components/Cars/CarDetails";
import UserHandeling from "../Components/Admin/UserHandeling";
import News from "../Components/News/News";
import Dashboard from "../Components/Admin/Dashboard";

const history = createBrowserHistory();


export const Routes = () => {
  return (
    <BrowserRouter history={history}>
        <Switch>

            <PublicRoute exact path="/">
              <LayOut page={<Home/>}/>
            </PublicRoute>
            <PublicRoute exact path="/auth">
              <LayOut page={<Login/>}/>
            </PublicRoute>
            <PublicRoute exact path="/register">
              <LayOut page={<Register/>}/>
            </PublicRoute>
            <PublicRoute exact path="/aboutus">
              <LayOut page={<Aboutus/>}/>
            </PublicRoute>
            <PublicRoute exact path="/news">
              <LayOut page={<News/>}/>
            </PublicRoute>
            <PublicRoute exact path="/contactus">
              <LayOut page={<Contactus/>}/>
            </PublicRoute>
            <PublicRoute exact path="/cars">
              <LayOut page={<CarLayout/>}/>
            </PublicRoute>
            <PublicRoute exact path="/cardetails/:id">
              <LayOut page={<CarDetails/>}/>
            </PublicRoute>



            <PrivateRoute exact path="/services">
              <LayOut page={<PublishAds/>}/>
            </PrivateRoute>

            <AdminRoute exact path="/admin">
              <AdminLayout page={<Dashboard/>}/>
            </AdminRoute>

            <AdminRoute exact path="/publishads">
              <AdminLayout page={<AdminAds/>}/>
            </AdminRoute>

            <AdminRoute exact path="/pendingads">
              <AdminLayout page={<PendingAds/>}/>
            </AdminRoute>

            <AdminRoute exact path="/rejectedads">
              <AdminLayout page={<RejectedAds/>}/>
            </AdminRoute>

            <AdminRoute exact path="/userhandle">
              <AdminLayout page={<UserHandeling/>}/>
            </AdminRoute>


        </Switch>
    </BrowserRouter>
  )
}
