/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import image1 from '../../assets/img1.jpg'
import image2 from '../../assets/img2.jpg'
import { Col, Row, Container } from 'react-bootstrap'
import { useHistory } from "react-router-dom";

import toyota from '../../assets/toyotaicon.ico'
import bmw from '../../assets/bmwicon.ico'
import ford from '../../assets/fordicon.ico'
import honda from '../../assets/hondaicon.ico'
import land from '../../assets/landrovericon.ico'
import mit from '../../assets/mitshubishiicon.ico'
import nissan from '../../assets/nissanicon.ico'
import volks from '../../assets/volkswagenicon.ico'

const Home = (props) => {

    let history = useHistory()

    const auth = () =>{
        history.push("/services")
    }

    return (
        <>
            <header>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner" role="listbox">

                        <div class="carousel-item active" style={{ backgroundImage: "url("+image1+")" }}>
                            <div class="carousel-caption d-none d-md-block">
                                <h3 class="display-4">The cars we drive say a lot about us.....</h3>
                            </div>
                        </div>

                        <div class="carousel-item" style={{ backgroundImage: "url("+image2+")" }}>
                            <div class="carousel-caption d-none d-md-block">
                                <h3 class="display-4">Drop a gear & disappear..</h3>
                            </div>
                        </div>

                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </header>

            <div id="services" class="container-fluid text-center bg-grey slide">
                <div class="row slide">
                    <div class="col-sm-3">
                        <img src={toyota}/>
                        <p>Toyota</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={nissan}/>
                        <p>Nissan</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={honda}/>
                        <p>Honda</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={ford}/>
                        <p>Ford</p>
                    </div>
                </div>
                <div class="row slide">
                    <div class="col-sm-3">
                        <img src={bmw}/>
                        <p>BMW</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={land}/>
                        <p>Land Rover</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={mit}/>
                        <p>Mitsubishi</p>
                    </div>
                    <div class="col-sm-3">
                        <img src={volks}/>
                        <p>Volkswagan</p>
                    </div>
                </div>
            </div>


            <div class="slide">
                <Container>
                <hr class="featurette-divider"/>
                    <Row>
                        <Col>
                            <h4 class="display-2 mt-4">
                                WELCOME ! <br />
                                LET'S POST YOUR <br />
                                ADD HERE
                            </h4>
                        </Col>
                    </Row>
                    <hr class="featurette-divider"/>
                </Container>
            </div>
        </>
    )
}

export default Home