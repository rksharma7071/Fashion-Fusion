import { Link } from '@mui/material'
import React from 'react'

function Navbar() {
  return (
    <div>
      <h3>Fashion Fusion</h3>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/signin'}>Sign In</Link>
    </div>
  )
}

export default Navbar