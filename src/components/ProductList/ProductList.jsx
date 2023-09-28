import React, { useState, useEffect, useRef } from 'react'; // Updated to include useRef
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts, fetchProductsByCategory } from '../../api/fakeStoreApi';
import ProductDetail from '../ProductDetail/ProductDetail';
import './ProductList.css';

const ProductList = ({ selectedCategory, minPrice, maxPrice, sortOrder, addToCart }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const modalContentRef = useRef(); // Create a ref for the modal content

    useEffect(() => {
        const fetchProducts = async () => {
            let fetchedProducts = [];

            if (selectedCategory) {
                fetchedProducts = await fetchProductsByCategory(selectedCategory);
            } else {
                fetchedProducts = await fetchAllProducts();
            }

            if (minPrice) {
                fetchedProducts = fetchedProducts.filter(product => product.price >= minPrice);
            }

            if (maxPrice) {
                fetchedProducts = fetchedProducts.filter(product => product.price <= maxPrice);
            }

            // Sorting
            if (sortOrder === 'name-asc') {
                fetchedProducts.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOrder === 'name-desc') {
                fetchedProducts.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOrder === 'price-asc') {
                fetchedProducts.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'price-desc') {
                fetchedProducts.sort((a, b) => b.price - a.price);
            }

            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, [selectedCategory, minPrice, maxPrice, sortOrder]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isModalOpen && !modalContentRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isModalOpen]);

    return (
        <div className="product-list">
            <div className="products">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                        <button onClick={() => handleProductClick(product)}>
                            View Details
                        </button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalContentRef}> 
                        <ProductDetail product={selectedProduct} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
