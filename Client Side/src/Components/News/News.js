import React from 'react'
import Image from '../../assets/img2.jpg'

const News = () => {
    return (
        <div class="container">
            <div class="row mb-2">
                <div class="col-12 text-center pt-3">
                    <h1>Latest News</h1>
                </div>
            </div>

            <div class="row">
                <div class="col-12 pb-5">
                    <section class="row">

                        <div class="col-12 col-md-6 pt-2 pl-md-1 mb-3 mb-lg-4">
                            <div class="row">

                                <div class="col-6 pb-1 pt-0 pr-1">
                                    <div class="card border-0 rounded-0 text-white overflow zoom">
                                        <div class="position-relative">

                                            <div class="ratio_right-cover-2 image-wrapper">
                                                <a href="#">
                                                    <img class="img-fluid" src={Image}/>
                                                </a>
                                            </div>
                                            <div class="position-inherit p-2 p-lg-3 b-0 w-100 bg-shadow">
                                                <a class="p-1 badge badge-primary rounded-0" href="#">New Arrivals</a>
                                                <a href="#">
                                                    <h2 class="h5 text-dark my-1">Should you see the Fantastic Beasts sequel?</h2>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>

                </div>
            </div>
        </div>
    )
}



export default News