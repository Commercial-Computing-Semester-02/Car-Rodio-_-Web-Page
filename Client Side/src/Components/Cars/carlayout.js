/* Copyright (C) 2021 Chameera De Silva - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to:info.chameera.de@gmail.com , or visit :https://chameera-de.github.io
 */
import { useState } from "react"
import { postService } from "../../Backend Services/PostService"
import image from '../../assets/img1.jpg'

const CarLayout = () => {

    const {posts} = postService.GetPostsWithImages()
    const {brands} = postService.GetBrands()

    console.log(posts)

    const [postDetails, setPostDetails] = useState({
        price: '',
        model: '',
        colour: '',
        years: '',
        fuel: '',
        miles: '',
        conditions: '',
        transmission: '',
        brand: '',
        region: '',
        city: '',
    })

    return(
        <div class="row">

            <div class="col-sm-3" style={{height: "auto", bgColor: "#98AFC7"}}>
                
                <form>
                    <div class="container-fluid">

                        <h2 class="text-dark text-left">Filters <i class="fas fa-filter"></i></h2>

                        Price <input id="price" type="range" data-slider-min="0" data-slider-max="100" data-slider-step="1" />
                        
                        Model <input type="text" name="model"  required />
                        Colour <input type="text" name="colour"  required />
                        Year <input type="text"  name="years"  required />

                        Miles <input id="miles" type="range" data-slider-min="0" data-slider-max="100" data-slider-step="1" />
                        
                        Fuel
                        <select name="fuel">
                            <option value="Petrol">Petrol</option>
                            <option value="Disel">Disel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        Condition
                        <select name="conditions">
                            <option value="Brand">Brand New</option>
                            <option value="Used">Used</option>
                        </select>
                        Transmission
                        <select name="transmission">
                            <option value="Manual">Manual</option>
                            <option value="Auto">Auto</option>
                        </select>
                        Brand
                        <select name="brand">
                            {brands.map((item, index) => {
                                return (
                                    <option value={item.brand_name}>{item.brand_name}</option>
                                )
                            })}
                        </select>
                    
                        Region <input type="text" name="region"  required />
                        City <input type="text" name="city"  required />
                    </div>
                </form>

            </div>

            <div class="row col-sm-9" style={{position: "absolute", marginLeft: "300px"}}>
                {
                    posts.map((item, index) => {
                        return item.adDetails.approved == 1 && item.adDetails.rejected == 0 ?
                        
                            <div class="col-sm-3" style={{width: "18rem", margin: "45px"}}>
                            <img class="card-img-top" src={item.image == null ? image : item.image} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">{item.adDetails.title}</h5>
                                    <button href="#" class="btnContact">View</button>
                                </div>
                            </div>
                        :
                            null
                    })
                }
            </div>
            
        </div>
    )
}


export default CarLayout