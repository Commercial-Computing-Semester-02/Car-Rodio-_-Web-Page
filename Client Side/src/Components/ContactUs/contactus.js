import map from '../../assets/map.jpg'

const contactus = () => {


    const handleSubmit = (event) =>{
        event.preventDefault()
    }

    return(
        <div class="container mb-5 slide">
            <div style={{textAlign:"center", marginTop: "5em"}}>
                <h2>Contact Us</h2>
                <p>Swing by for a cup of coffee, or leave us a message:</p>
            </div>
            <div class="row bg-grey" style={{borderRadius:"20px"}}>
                <div class="col thumbnail">
                    <img class="container-fluid" src={map} width="500px"/>
                </div>
                <div class="col container">
                    <form onSubmit={handleSubmit}>
                        <label for="fname">Name</label>
                        <input type="text" id="fname" name="name" placeholder="Your name" />

                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your email" />

                        <label for="country">City</label>
                        <select id="country" name="country">
                            <option value="Colombo">Colmobo</option>
                            <option value="Kaluthara">Kaluthara</option>
                            <option value="Gampaha">Gampaha</option>
                        </select>

                        <label for="subject">Subject</label>
                        <textarea id="subject" name="subject" placeholder="Write something.." style={{height:"170px"}}></textarea>
                        <button class="button" data-micron="pop" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default contactus