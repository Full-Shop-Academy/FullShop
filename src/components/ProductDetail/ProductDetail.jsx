import React from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
    if (!product) {
        return null;
    }

    const { image, title, description, category, price } = product;

    return (
        <div className="product-detail">
            <img src={image} alt={title} />
            <div> {/* Grouping product details together */}
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Category: {category}</p>
                <p>Price: ${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
