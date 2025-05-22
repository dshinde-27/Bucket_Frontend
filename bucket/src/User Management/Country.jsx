import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar'
import '../Style/role.css';
import bgImage from '../Image/rose.jpg';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import Navbar from '../Layout/Navbar';
import axios from 'axios';

function Country() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCountry, setNewCountry] = useState({
        countryName: '',
        status: 'Active',
    });

    const AddCountryUrl = 'https://localhost:7086/api/Location/AddCountry';
    const GetCountryUrl = 'https://localhost:7086/api/Location/GetCountries';
    const DeleteCountryUrl = 'https://localhost:7086/api/Location/DeleteCountry';

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(GetCountryUrl);
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const handleAddCountry = async () => {
        debugger
        try {
            await axios.post(AddCountryUrl, newCountry);
            fetchCountries();
            setNewCountry({ countryName: '', status: 'Active' });
            setShowModal(false);
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };

    const handleDeleteCountry = async (id) => {
        try {
            await axios.delete(`${DeleteCountryUrl}/${id}`);
            fetchCountries();
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    };
    return (
        <div className='role-page' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <div className='main-layout'>
                <Sidebar />
                <div className='role-container'>
                    <div className="role-header">
                        <h2>Country</h2>
                        <div className="role-actions">
                            <button
                                className="search-icon"
                                onClick={() => setShowSearch(prev => !prev)}
                            >
                                <FaSearch />
                            </button>
                            {showSearch && (
                                <input
                                    type="text"
                                    className="search-box"
                                    placeholder="Search country..."
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            )}
                            <button className='add-role-btn' onClick={() => setShowModal(true)}>
                                <FaPlus /> Add Country
                            </button>
                        </div>
                    </div>

                    <div className='role-list'>
                        <table className='role-table'>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.map((country) => (
                                    <tr key={country.id}>
                                        <td>{country.countryName}</td>
                                        <td>
                                            <span className={`status ${country.status.toLowerCase()}`}>
                                                {country.status}
                                            </span>
                                        </td>
                                        <td className='action-buttons'>
                                            <FaEdit className='icon edit' title='Edit' />
                                            <FaTrash
                                                className='icon delete'
                                                title='Delete'
                                                onClick={() => handleDeleteCountry(country.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <h3>Add New Country</h3>

                                <label>Country</label>
                                <input
                                    type='text'
                                    value={newCountry.countryName}
                                    onChange={(e) =>
                                        setNewCountry({ ...newCountry, countryName: e.target.value })
                                    }
                                />

                                <label>Status</label>
                                <select
                                    value={newCountry.status}
                                    onChange={(e) =>
                                        setNewCountry({ ...newCountry, status: e.target.value })
                                    }
                                >
                                    <option value='Active'>Active</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>

                                <div className='modal-actions'>
                                    <button onClick={handleAddCountry}>Submit</button>
                                    <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Country