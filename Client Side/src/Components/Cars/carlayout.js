import {useEffect, useState} from "react"
import {postService} from "../../Backend Services/PostService"
import image from '../../assets/img1.jpg'
import ad from '../../assets/ad.png'
import {useHistory} from "react-router-dom";
import NewCarLayout from "./NewCarLayout";
import add from "../../assets/add.png"
import './car-layout.css'

const CarLayout = () => {

    let history = useHistory()
    const results = postService.GetPostsWithImages()
    const { brands } = postService.GetBrands()
    const initialPostDetails = {
        price1: '',
        price2: '',
        model: '',
        colour: '',
        year: '',
        fuel: '',
        miles: '',
        conditions: '',
        transmission: '',
        brand: '',
        region: '',
        city: '',
    }

    const [postDetails, setPostDetails] = useState(initialPostDetails)
    const [postList, setPostList] = useState([])
    const filterPosts = () => {
        console.log(parseFloat(postDetails.price1), parseFloat(postDetails.price2))
        setPostList(results.posts.filter(
            item =>
                (
                    (parseFloat(postDetails.price1) <= item.adDetails.price && postDetails.price2 === '')
                    || (postDetails.price1 === '' && parseFloat(postDetails.price2) > item.adDetails.price)
                    || (parseFloat(postDetails.price2) > item.adDetails.price && parseFloat(postDetails.price1) <= item.adDetails.price)
                    || (postDetails.price1 === '' && postDetails.price2 === '')
                ) &&
                (postDetails.fuel == item.adDetails.fuel || postDetails.fuel == '') &&
                (postDetails.brand == item.adDetails.brand || postDetails.brand == '') &&
                (postDetails.conditions == item.adDetails.conditions || postDetails.conditions == '') &&
                (postDetails.transmission == item.adDetails.transmission || postDetails.transmission == '') &&
                ((postDetails.price1 <= item.adDetails.price) && (postDetails.price2 >= item.adDetails.price) || postDetails.price1 == 0 || postDetails.price2 == 0) &&
                (item.adDetails.colour.toLowerCase().includes(postDetails.colour.toLowerCase()) || postDetails.colour == '') &&
                (item.adDetails.model.toLowerCase().includes(postDetails.model.toLowerCase()) || postDetails.model == '') &&
                (item.adDetails.year.includes(postDetails.year) || postDetails.year == '') &&
                (item.adDetails.region.toLowerCase().includes(postDetails.region.toLowerCase()) || postDetails.region == '') &&
                (item.adDetails.city.toLowerCase().includes(postDetails.city.toLowerCase()) || postDetails.city == '') &&
                (item.adDetails.miles <= postDetails.miles || postDetails.miles == 0)
        )
        )
    }
    useEffect(() => {
        setPostList(results.posts)
    }, [results.posts])

    const handleChange = (event) => {
        let nam = event.target.name
        let val = event.target.value
        console.log(nam, val)
        setPostDetails({
            ...postDetails,
            [nam]: val
        })
    }


    function DetailView(id) {
        history.push('/cardetails/' + id)
    }

    return (
        <div class="row justify-content-center">
            <NewCarLayout
                setPostDetails={setPostDetails}
                filterPosts={filterPosts} handleChange={handleChange}
            />

            <div className="row d-flex justify-content-center" style={{ marginTop: 68, width: '100%' }}>
                <img src="https://www.patpat.lk/banner/2021/05-17/1440_90.jpg" alt="banner" />
            </div>
            <div style={{ position: "sticky", top: 0 }}>
                <img src={add} alt="banner" />
            </div>

            <button className="side-buttons" style={{top: 300}}>Top Dealers</button>
            <button className="side-buttons" style={{top: 360}}>Quick Deals</button>
            <button className="side-buttons" style={{top: 420}}>Contact Us</button>

            <div className="col-sm-9 d-flex justify-content-center">

                <div class="row col-sm-12" style={{ marginTop: 56, position: "relative" }}>

                    {
                        postList.length ? postList.map((filteredItem, index) => {
                            return filteredItem.adDetails.approved == 1 && filteredItem.adDetails.rejected == 0 ?

                                <div class="col-sm-3" style={{ width: "18rem", margin: "45px" }}>
                                    <img class="card-img-top" src={filteredItem.image == null ? image : filteredItem.image} alt="Card image cap" />
                                    <div class="card-body">
                                        <h5 class="card-title">{filteredItem.adDetails.title}</h5>
                                        <button class="btnContact" onClick={() => DetailView(filteredItem.adDetails.id)}>View</button>
                                    </div>
                                </div>
                                :
                                null
                        }) :
                            (!results.posts.length ? <div className="d-flex justify-content-center align-items-center"
                                style={{
                                    minHeight: '100vh',
                                    width: '100%'
                                }}
                            >
                                <h3>Please Wait...!</h3>
                            </div> :
                                <div className="d-flex justify-content-center align-items-center"
                                    style={{
                                        minHeight: '100vh',
                                        width: '100%'
                                    }}
                                >
                                    <h3>Sorry...! No Matching Cars to Show</h3>
                                </div>
                            )
                    }
                </div>
            </div>

        </div>
    )
}


export default CarLayout