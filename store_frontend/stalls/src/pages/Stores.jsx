import React from 'react'
import { getStores } from '../api';
import { Link, useLoaderData } from 'react-router-dom';


export async function storeLoader(){
  return await getStores()
}


export default function Stores() {
  const stores = useLoaderData()
  console.log(stores)
  const url = "http://localhost:5000/stores";
  const storeElements = stores.map((store) => (
    <div className="card" key={store.id}>
      <Link
        to={`${store.id}`}
      >
        <div className='img-holder'>

        <img
          src={`${url}/${store.id}/image`}
          alt={store.name}
          className="store-img"
          type={store.mime_type}
          ></img>
          </div>
        <section className="store-info">
          <p className='opening-closing-time'>Opening Time: {store.opening_time}</p>
          <p className='opening-closing-time'>Closing Time: {store.closing_time}</p>
          <p>Floor Number: {store.floor_number}</p>
          <p className='store-name'>{store.name}</p>
          <p>
            <span className="price">KSH {store.price}</span>
          </p>
        </section>
      </Link>
    </div>
  ));
  return (
    <section className='card-container'>
      <div className="cards-list">
        {stores ? storeElements : <h1>No stores as of now</h1>}
      </div>
    </section>
  )
}
