import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Card from '../Card'
import Carousel from '../Carousel'
function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const fetchData= async()=> {
    const response = await fetch('http://localhost:5000/api/fetchData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const foodData =await response.json();
    console.log(foodData);
    setFoodItems(foodData);
  
  }
  useEffect(() => {
    fetchData();
  },[]);
  

  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <div className="container">
        <div className="row">
        {foodItems.map((data)=>{
          return(
            <div key={data._id} className='col-sm-4 col-md-6 col-lg-3'><Card data={data}></Card></div>
          )
        })}
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Home
