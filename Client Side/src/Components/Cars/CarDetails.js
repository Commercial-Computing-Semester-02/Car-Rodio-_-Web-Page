import React, { useState } from 'react'
import { useParams } from 'react-router'
import meter from '../../assets/meter.svg'
import cal from '../../assets/cal.svg'
import power from '../../assets/power.svg'
import settings from '../../assets/settings.svg'
import { postService } from '../../Backend Services/PostService'
import CommentSection from './Comment'
import EmailForm from './EmailForm'
import Rating from 'react-rating'


const CarDetails = () => {

    const id = useParams()

    const {post} = postService.GetPost(id.id)
    const {image} = postService.GetImages(id.id)
    const [rate, setRate] = useState(0)

    return(
        <div class="container-fluid">
            <div class="row">
                <div class="card col-sm-7 shadow mr-4">
                    <header>
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            </ol>
                            <div class="carousel-inner" role="listbox">
                                {image.map((item, index)=>{
                                    return(
                                        <div class={index==1 ? "carousel-item active" : "carousel-item"} style={{ backgroundImage: "url("+item.path+")",  height: "0px" }} />
                                    )
                                })}
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
                </div>
                <div class="card col-sm-4 baseColor text-white shadow ml-4">
                    <span class="display-4 text-center">Contact Owner</span>
                    <hr class="featurette-divider footer-border"/>
                    <h4 class="m-2 text-white">Name: {post.name}</h4>
                    <h4 class="m-2 text-white">Phone: {post.contact}</h4>
                    <h4 class="m-2 text-white">City: {post.city}</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-7 mr-4">
                    <div class="row ml-4 comment-widgets">
                        <div class="card col-sm-2 m-4 comment-row">
                            <img src={meter} class="mt-3" width="100px" height="100px"/>
                            <h4 class="text-center mt-3">{post.miles} km</h4>
                        </div>
                        <div class="card col-sm-2 m-4 comment-row">
                            <img src={cal} class="mt-3" width="100px" height="100px"/>
                            <h4 class="text-center mt-3">{post.year}</h4>
                        </div>
                        <div class="card col-sm-2 m-4 comment-row">
                            <img src={power} class="mt-3" width="100px" height="100px"/>
                            <h4 class="text-center mt-3">{post.fuel}</h4>
                        </div>
                        <div class="card col-sm-2 m-4 comment-row">
                            <img src={settings} class="mt-3" width="100px" height="100px"/>
                            <h4 class="text-center mt-3">{post.transmission}</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-5 text-left mr-5 ml-4">
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                onClick={(rate)=>setRate(rate)}
                            />
                            <span class="badge badge-success">{rate}</span>
                            <h3 class="m-2">Rs. {post.price} (negotiable)</h3>
                            <h4 class="m-2">Condition: {post.conditions}</h4>
                            <h4 class="m-2">Brand: {post.brand}</h4>
                            <h4 class="m-2">Model: {post.model}</h4>
                            <h4 class="m-2">Year: {post.year}</h4>
                            <h4 class="m-2">Miles: {post.miles}</h4>
                            <h4 class="m-2">Fuel: {post.fuel}</h4>
                            <h4 class="m-2">Transmission: {post.transmission}</h4>
                        </div>
                        <div class="col-sm-5 text-left ml-5 mr-3">
                            <h4 class="m-2">Description: </h4>
                            <span class="m-2">{post.description}</span>
                        </div>
                    </div>
                </div>
                <div class="card col-sm-4 baseColor text-white shadow ml-4 mt-3">
                    <EmailForm post={post}/>
                </div>
            </div>
            <div class="row">
                <CommentSection postid={id.id} uid={post.uid}/>
            </div>
        </div>
    )
}

export default CarDetails