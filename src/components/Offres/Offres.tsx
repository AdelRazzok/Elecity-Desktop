import React, { useEffect, useState } from 'react'
import './Offres.scss'

const fetchOffres = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    }
  }
  return await (await fetch('http://localhost:80/api/v1/offers', options)).json()
}

const PatchOffres = async (formValue: any) => {
  const { _id, brand, model, mileage, available } = formValue
  const data = {
    _id,
    brand,
    mileage,
    model,
    available
  }
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'token': 'fcacbd6ab1d8b11bdba1559dec6fce16'
    },
    body: JSON.stringify(data)
  }
  return await (await fetch(`http://localhost:80/api/v1/cars/${_id}`, options)).json()
}

const Offres = () => {

  
  return (
    <div>Offres</div>
  )
}

export default Offres