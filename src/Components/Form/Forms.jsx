import React, { useState } from 'react'

const Forms = () => {
    const [city, setCity] = useState("")
      const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(city); 
  };
  return (
    <div>
        <form  onSubmit={() =>{(e)=> handleSubmit(e)}} className='search'>
    <input type="text" placeholder='Enter city' value={city} onChange={(e)=>setCity(e.target.value)}/>
    <button type='submit'>Search</button>
        </form>

        <div>
            <h1>temp</h1> 
            <h4>weather</h4> 
            <p>city</p>
        </div>

        <div>
            <h5>Feels</h5>
            <h5>Humidity</h5>
            <h5>wind</h5>
        </div>

   
    </div>
  )
}

export default Forms