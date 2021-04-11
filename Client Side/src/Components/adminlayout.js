/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */

import { authenticationService } from "../Backend Services/UserService"

const AdminLayout = ({page}) => {

    return(
        <>
            <nav class="navbar navbar-dark sticky-top flex-md-nowrap p-0 baseColor">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Admin Panel</a>
                <ul class="navbar-nav px-3" style={{margin: "4px"}}>
                    <li class="text-nowrap">
                        <a type="button" class="btn btn-outline-dark ml-3" onClick={authenticationService.logout} href="/">Log Out</a>
                    </li>
                </ul>
            </nav>

            <div>
                <div class="row">
                    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item-cust">
                                <a class="nav-link" href="/admin">
                                    Dashboard
                                </a>
                            </li>
                            <li class="nav-item-cust">
                                <a class="nav-link" href="/publishads">
                                    Published Advertisements
                                </a>
                            </li>
                            <li class="nav-item-cust">
                                <a class="nav-link" href="/pendingads">
                                    Pending Advertisements
                                </a>
                            </li>
                            <li class="nav-item-cust">
                                <a class="nav-link" href="/rejectedads">
                                    Rejected Advertisements
                                </a>
                            </li>
                            <li class="nav-item-cust">
                                <a class="nav-link" href="#">
                                    Users
                                </a>
                            </li>
                        </ul>
                    </div>
                    </nav>

                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {page}
                    </main>
                </div>
            </div>
    </>
    )
}


export default AdminLayout