import React from 'react'
import Navbar from "./Navbar"
import Products from './Products'
import Variants from './variants'
function Home() {
  return (
    <div>
      <h3>Home</h3>
      <Products/>
      <Variants/>
    </div>
    
  )
}

export default Home