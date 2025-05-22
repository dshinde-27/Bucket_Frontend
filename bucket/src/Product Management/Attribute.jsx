import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import '../Style/role.css';
import '../Style/attribute.css';

function Attribute() {
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [attributeName, setAttributeName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [values, setValues] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const CategoryUrl = 'https://localhost:7086/api/Category';

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${CategoryUrl}/GetCategories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${CategoryUrl}/GetSubCategories`);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching SubCategories:', error);
    }
  };

  const handleAddValue = () => {
    setValues([...values, { value: '', meta: '' }]);
  };

  const handleValueChange = (index, field, value) => {
    const updated = [...values];
    updated[index][field] = value;
    setValues(updated);
  };

  const handleRemoveValue = (index) => {
    const updated = [...values];
    updated.splice(index, 1);
    setValues(updated);
  };

  const handleSaveAttribute = () => {
    const attributeData = {
      name: attributeName,
      categoryId,
      subCategoryId,
      values,
    };
    console.log('Saved Attribute:', attributeData);
    setShowModal(false);

    // Reset fields
    setAttributeName('');
    setCategoryId('');
    setSubCategoryId('');
    setValues([]);
  };

  const handleDeleteTag = (id) => {
    const filtered = attributes.filter(attr => attr.id !== id);
    setAttributes(filtered);
  };

  const handleEditClick = (attr) => {
    setShowModal(true);
    setAttributeName(attr.attributeName);
    setCategoryId(attr.categoryId);
    setSubCategoryId(attr.subCategoryId);
    setValues(attr.values);
  };

  return (
    <div
      className="role-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="role-container">
          <div className="role-header">
            <h2>Attributes</h2>
            <div className="role-actions">
              <button className="search-icon" onClick={() => setShowSearch((prev) => !prev)}>
                <FaSearch />
              </button>
              {showSearch && (
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search categories..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
              <button className="add-role-btn" onClick={() => setShowModal(true)}>
                <FaPlus /> Add Attribute
              </button>
            </div>


          </div>
          <div className='role-list'>
            <div className="table-wrapper">
              <table className='role-table'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Attribute Name</th>
                    <th>Values</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes
                    .filter(attr => attr.attributeName.toLowerCase().includes(searchText.toLowerCase()))
                    .map(attr => (
                      <tr key={attr.id}>
                        <td>{attr.id}</td>
                        <td>{attr.attributeName}</td>
                        <td>{attr.values.map(v => v.value).join(', ')}</td>
                        <td>
                          <span className={`status ${attr.status.toLowerCase()}`}>
                            {attr.status}
                          </span>
                        </td>
                        <td className='action-buttons'>
                          <FaEdit className='icon edit' title='Edit' onClick={() => handleEditClick(attr)} />
                          <FaTrash className='icon delete' title='Delete' onClick={() => handleDeleteTag(attr.id)} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add New Attribute</h3>
                <label>Attribute Name</label>
                <input
                  type="text"
                  placeholder="Attribute Name"
                  value={attributeName}
                  onChange={(e) => setAttributeName(e.target.value)}
                />

                <label>Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => {
                    setCategoryId(Number(e.target.value));
                    setSubCategoryId(''); // Clear subcategory when category changes
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>

                <label>Sub Category</label>
                <select
                  value={subCategoryId}
                  onChange={(e) => setSubCategoryId(Number(e.target.value))}
                >
                  <option value="">Select Sub Category</option>
                  {subCategories
                    .filter((sub) => Number(sub.categoryId) === Number(categoryId))
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.subCategoryName}
                      </option>
                    ))}
                </select>

                {/* Value / Meta inputs */}
                {values.length === 0 ? (
                  <button className='btn-add-value' onClick={handleAddValue}>+ Add Value</button>
                ) : (
                  <>
                    {values.map((item, index) => (
                      <div key={index} className="value-row">
                        <input
                          type="text"
                          placeholder="Value"
                          value={item.value}
                          onChange={(e) => handleValueChange(index, 'value', e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Meta"
                          value={item.meta}
                          onChange={(e) => handleValueChange(index, 'meta', e.target.value)}
                        />
                        <button className="btn-remove" onClick={() => handleRemoveValue(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button className='btn-add-value' onClick={handleAddValue}>Add More Values</button>
                  </>
                )}

                <div className="modal-actions">
                  <button onClick={handleSaveAttribute}>Save</button>
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attribute;
