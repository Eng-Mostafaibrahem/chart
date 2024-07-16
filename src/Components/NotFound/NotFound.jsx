import React from 'react'
import img_404 from '../../assets/images/error-404.jpg'
export default function NotFound() {
  return (
    <section className="container ">
    <img src= {img_404} alt="error image" className='  w-75 mx-auto d-block rounded'  />
  </section>
  )
}
