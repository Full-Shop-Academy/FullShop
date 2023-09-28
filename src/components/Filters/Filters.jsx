import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../api/fakeStoreApi';
import './Filters.css';

const Filters = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortByName, setSortByName] = useState(''); // 'asc', 'desc', or ''
    const [sortByPrice, setSortByPrice] = useState(''); // 'asc', 'desc', or ''

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await fetchAllCategories();
            setCategories(fetchedCategories);
        };

        fetchCategories();
    }, []);

    const capitalizeWords = (str) => {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const applyFilters = () => {
        let sort = '';

        if (sortByName) {
            sort = `name-${sortByName}`;
        } else if (sortByPrice) {
            sort = `price-${sortByPrice}`;
        }

        onFilterChange({
            category: selectedCategory,
            minPrice,
            maxPrice,
            sort
        });
    };

    return (
        <div className="filters">
            <div className="filter-section">
                <label>Category:</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {capitalizeWords(category)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-section">
                <label>Price Range:</label>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>

            <div className="filter-section">
                <div>
                    <label>Sort by Name:</label>
                    <select value={sortByName} onChange={(e) => setSortByName(e.target.value)}>
                        <option value="">Default</option>
                        <option value="asc">Name (A-Z)</option>
                        <option value="desc">Name (Z-A)</option>
                    </select>
                </div>

                <div>
                    <label>Sort by Price:</label>
                    <select value={sortByPrice} onChange={(e) => setSortByPrice(e.target.value)}>
                        <option value="">Default</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Filters;
