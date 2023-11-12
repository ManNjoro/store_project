import React from 'react'
import { getStores } from '../api';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router-dom';

export async function storeDetailLoader({ params }) {
    return await getStores(params.id);
}

export default function StoreDetails() {
    const store = useLoaderData()
    const url = "http://localhost:5000/stores";
    return (
      <div className="store-detail-container">
        <Link to={`..`} relative="path" className="back-btn">
          <FaArrowLeftLong /> <span>Back to stores</span>
        </Link>
  
        <div className="store-card">
          <img
            alt={store.name}
            src={`${url}/${store.id}/image`}
            className="store-detail-img"
          />
          <div className="store-details-only">
            <h2>{store.name}</h2>
            <p className="store-price">
              <b>Price:</b> KSH {store.price}
            </p>
            <p><b>Floor Number:</b> {store.floor_number}</p>
            <p><b>Opening time:</b> {store.opening_time}</p>
            <p><b>Closing time:</b> {store.closing_time}</p>
            <p><b>Description:</b> {store.description}</p>
          </div>
        </div>
      </div>
    );
}
