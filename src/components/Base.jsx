import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Base() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default Base