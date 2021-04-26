import { useState } from "react"
import { postService } from "../../Backend Services/PostService"
import image from '../../assets/img1.jpg'
import ad from '../../assets/ad.png'
import { useHistory } from "react-router-dom";

const CarLayout = () => {

    let history = useHistory()
    const {posts} = postService.GetPostsWithImages()
    const {brands} = postService.GetBrands()

    const [postDetails, setPostDetails] = useState({
        price1: 0,
        price2: 0,
        model: '',
        colour: '',
        year: '',
        fuel: '',
        miles: 0,
        conditions: '',
        transmission: '',
        brand: '',
        region: '',
        city: '',
    })

    const handleChange = (event) => {
        let nam = event.target.name
        let val = event.target.value

        setPostDetails({
            ...postDetails,
            [nam]: val
        })
    }

    
    function DetailView(id){
        history.push('/cardetails/'+id)
    }

    return(
        <div class="row">

            <div class="col-sm-3" style={{height: "auto", bgColor: "#98AFC7"}}>
                
                <form>
                    <div class="container-fluid card shadow">

                        <h2 class="text-dark text-left">Filters <i class="fas fa-filter"></i></h2>

                        Price 
                        <div class="row">
                            <input type="text" placeholder="Minimum Price" name="price1" class="col-sm-11 m-3" onChange={handleChange} required />
                            <input type="text" placeholder="Maximum Price" name="price2" class="col-sm-11 m-3" onChange={handleChange} required />
                        </div>
                        Model <input type="text" placeholder="Enter Model" name="model" onChange={handleChange} required />
                        Colour <input type="text" placeholder="Enter Colour" name="colour" onChange={handleChange} required />
                        Year <input type="text" placeholder="Enter Year" name="year" onChange={handleChange} required />

                        Miles <input type="text"  name="miles" onChange={handleChange} required />
                        
                        Fuel
                        <select name="fuel" onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Disel">Disel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        Condition
                        <select name="conditions" onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Brand">Brand New</option>
                            <option value="Used">Used</option>
                        </select>
                        Transmission
                        <select name="transmission" onChange={handleChange}>
                            <option value="">None</option>
                            <option value="Manual">Manual</option>
                            <option value="Auto">Auto</option>
                        </select>
                        Brand
                        <select name="brand" onChange={handleChange}>
                            <option value="">None</option>
                            {brands.map((item, index) => {
                                return (
                                    <option value={item.name}>{item.name}</option>
                                )
                            })}
                        </select>
                    
                        Region <input type="text" name="region" onChange={handleChange} required />
                        City <input type="text" name="city" onChange={handleChange} required />
                    </div>
                </form>

                <div class="container-fluid card shadow">
                    <img src={ad} class="card"/>
                </div>

            </div>

            <div class="row col-sm-9" style={{position: "absolute", marginLeft: "320px"}}>
                {
                    posts.filter(
                        item=>
                        (postDetails.fuel == item.adDetails.fuel || postDetails.fuel == '') &&
                        (postDetails.conditions == item.adDetails.conditions || postDetails.conditions == '') &&
                        (postDetails.transmission == item.adDetails.transmission || postDetails.transmission == '') &&
                        ((postDetails.price1 <= item.adDetails.price) && (postDetails.price2 >= item.adDetails.price) || postDetails.price1==0 || postDetails.price2 ==0) &&
                        (item.adDetails.colour.toLowerCase().includes(postDetails.colour.toLowerCase())  || postDetails.colour == '') &&
                        (item.adDetails.model.toLowerCase().includes(postDetails.model.toLowerCase())  || postDetails.model == '') &&
                        (item.adDetails.year.includes(postDetails.year)  || postDetails.year == '') &&
                        (item.adDetails.region.toLowerCase().includes(postDetails.region.toLowerCase())  || postDetails.region == '') &&
                        (item.adDetails.city.toLowerCase().includes(postDetails.city.toLowerCase())  || postDetails.city == '') &&
                        (item.adDetails.miles <= postDetails.miles || postDetails.miles == 0)
                    ).map((filteredItem, index) => {
                        return filteredItem.adDetails.approved == 1 && filteredItem.adDetails.rejected == 0 ?
                        
                            <div class="col-sm-3" style={{width: "18rem", margin: "45px"}}>
                            <img class="card-img-top" src={filteredItem.image == null ? image : filteredItem.image} alt="Card image cap"/>
                                <div class="card-body">
                                    <h5 class="card-title">{filteredItem.adDetails.title}</h5>
                                    <button class="btnContact" onClick={()=>DetailView(filteredItem.adDetails.id)}>View</button>
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