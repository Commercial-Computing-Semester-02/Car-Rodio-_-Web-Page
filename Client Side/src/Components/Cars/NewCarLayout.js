import React, {useEffect} from "react";
import {useState} from "react"
import {postService} from "../../Backend Services/PostService"
import './car-layout.css'

export default function NewCarLayout(props) {

    const [selector, setSelector] = useState('price')
    const {brands} = postService.GetBrands()
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

    useEffect(() => {
        props.setPostDetails(initialPostDetails)
    }, [selector])

    const fuelTypes = [
        {value: "Petrol", name: "Petrol"},
        {value: "Diesel", name: "Diesel"},
        {value: "Electric", name: "Electric"},
        {value: "Hybrid", name: "Hybrid"},
    ]
    const conditionTypes = [
        {value: "Brand", name: "Brand New"},
        {value: "Used", name: "Used"},
    ]
    const transmissionTypes = [
        {value: "Manual", name: "Manual"},
        {value: "Auto", name: "Auto"},
    ]
    const selectElements = {
        "fuel": fuelTypes,
        "conditions": conditionTypes,
        "transmission": transmissionTypes,
        "brand": brands
    }

    const SelectedElement = (selector) => {
        if(selector === "price") {
            return (
                <div className="col-5 row d-flex justify-content-between">
                    <div className="col-6">
                        <input type="number" style={{outline: "none"}}
                               name="price1"
                               onChange={props.handleChange}
                               placeholder="Minimum Price"
                        />
                    </div>
                    <div className="col-6">
                        <input type="number" style={{outline: "none"}}
                               name="price2"
                               onChange={props.handleChange}
                               placeholder="Maximum Price"
                        />
                    </div>
                </div>)
        }
        else if (selector === "fuel" || selector === 'conditions' ||
                selector === 'transmission' || selector === 'brand') {
            return (
                <div className="col-5">
                    <select name={selector} onChange={props.handleChange}>
                        <option value="">None</option>
                        {selectElements[selector].map((item, index) => {
                            return (
                                <option value={selector === 'brand' ? item.name : item.value}
                                        key={`${selector}-${index}`}>
                                    {item.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            )
        }
        else {
            return (
                <div className="col-5">
                    <input type="text" style={{outline: "none"}}
                           name={selector}
                           onChange={props.handleChange}
                           placeholder={`Enter ${selector}`}
                    />
                </div>)
        }
    }

    return (
        <React.Fragment>
            <div className="row d-flex justify-content-center"
                 style={{
                     width: '100vw',
                     backgroundColor: 'white',
                     position: 'fixed',
                     top: 56,
                     left: 0,
                     zIndex: 10
                 }}
            >
                <div className="col-2">
                    <select style={{outline: "none"}} onChange={e => setSelector(e.target.value)}>
                        <option value="price">Price</option>
                        <option value="model">Model</option>
                        <option value="colour">Colour</option>
                        <option value="year">Year</option>
                        <option value="miles">Miles</option>
                        <option value="fuel">Fuel</option>
                        <option value="conditions">Condition</option>
                        <option value="transmission">Transmission</option>
                        <option value="brand">Brand</option>
                    </select>
                </div>
                {
                    SelectedElement(selector)
                }
                <div className="d-flex align-items-center justify-content-end">
                    <i onClick={() => props.filterPosts()}
                       onSubmit={() => props.filterPosts()}
                       className="fas fa-search search-icon" />
                </div>
            </div>
        </React.Fragment>
    )
}