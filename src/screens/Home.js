import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

    const [search, setSearch] = useState('');
    const [foodItem, setFoodItem] = useState([])
    const [foodCat, setFoodCat] = useState([])

    const fetchedData = async () => {
        const response = await fetch("https://foodish-service.onrender.com/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        setFoodItem(json[0])
        setFoodCat(json[1])
    }

    useEffect(() => {
        fetchedData()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "2" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/400×300/?biryani" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/400×300/?paneer" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/400×300/?starter" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container overflow-hidden">
                {
                    foodCat !== undefined ? foodCat.map((item) => {
                        return (
                            <div key={item._id} className='row mb-3'>
                                <div className="fs-3 m-3">{item.CategoryName}</div>
                                <hr />
                                {foodItem !== undefined ? (
                                    foodItem.filter((data) => (item.CategoryName === data.CategoryName) && (data.name.toLowerCase().includes(search.toLowerCase())))
                                        .map((filteredItems) => {
                                            return (
                                                <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filteredItems} options={filteredItems.options[0]} />
                                                </div>
                                            )
                                        })
                                ) : (<div>Nothing to Display...</div>)}
                            </div>
                        )
                    }) : ""
                }
            </div>
            <div><Footer /></div>

        </div>
    )
}
