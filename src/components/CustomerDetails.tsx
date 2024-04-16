import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './style.css';

interface Customer {
    id: string;
    name: string;
    title: string;
    address: string;
}

interface CustomerDetailsProps {
    customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get<{ message: string[] }>('https://dog.ceo/api/breeds/image/random/9');
                setPhotos(response.data.message);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };

        fetchPhotos();
        const intervalId = setInterval(fetchPhotos, 10000); 

        return () => clearInterval(intervalId);
    }, [customer.id]);

    return (
        <div className="customer-details">
            <div className="text-details">
                <h1>{customer.name}</h1>
                <p>{customer.title}</p>
                <p>{customer.address}</p>
            </div>
            <div className="photo-grid">
                {photos.length > 0 &&  
                    photos.map((photo, index) => (
                        <LazyLoadImage
                            key={index}
                            src={photo}
                            alt={`Photo ${index}`}
                            effect="blur"
                            className="photo-grid-item"
                            width="200"
                            height="200"
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default CustomerDetails;
