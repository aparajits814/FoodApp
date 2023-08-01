import React from 'react'

function Carousel() {
    return (

        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" id="carsel">
                <div className="carousel-caption" style={{zIndex:"1"}}>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success text-white bg-danger" type="submit">Search</button>
                    </form>
                </div>
                <div className="carousel-item active carsel2">
                    <img src="https://source.unsplash.com/random/300×300/?Burger" className="d-block h-100 w-100" alt="..." />
                </div>
                <div className="carousel-item carsel2">
                    <img src="https://source.unsplash.com/random/300×300/?Pizza" className="d-block h-100 w-100" alt="..." />
                </div>
                <div className="carousel-item carsel2">
                    <img src="https://source.unsplash.com/random/300×300/?hotdog" className="d-block h-100 w-100" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
