import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import '../Style/role.css';
import bgImage from '../Image/rose.jpg';
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';
import Select from 'react-select';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as Io5Icons from 'react-icons/io5';

function Tag() {
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTagId, setEditTagId] = useState(null);
    const [showSearch, setShowSearch] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [newTag, setNewTag] = useState({
        tagName: '',
        slug: '',
        status: 'Active',
        description: '',
        icon: '',
        categoryId: '',
        subCategoryId: ''
    });

    const AddTagBaseUrl = 'https://localhost:7237/api/Tag/AddTag';
    const GetTagBaseUrl = 'https://localhost:7237/api/Tag/GetTag';
    const EditTagBaseUrl = 'https://localhost:7237/api/Tag/EditTag';
    const CategoryUrl = 'https://localhost:7237/api/Category';

    useEffect(() => {
        fetchTags();
        fetchCategories();
        fetchSubCategories();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axios.get(GetTagBaseUrl);
            setTags(response.data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${CategoryUrl}/GetCategories`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSubCategories = async () => {
        try {
            const response = await axios.get(`${CategoryUrl}/GetSubCategories`);
            setSubCategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleAddTag = async () => {
        try {
            if (!newTag.tagName.trim()) return alert("Tag name is required.");
            await axios.post(AddTagBaseUrl, newTag);
            fetchTags();
            resetModal();
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleEditClick = (tag) => {
        setNewTag({
            tagName: tag.tagName,
            slug: tag.slug,
            status: tag.status,
            description: tag.description,
            icon: tag.icon || '',
            categoryId: tag.categoryId || '',
            subCategoryId: tag.subCategoryId || ''
        });
        setEditTagId(tag.id);
        setIsEditMode(true);
        setShowModal(true);
    };

    const handleUpdateTag = async () => {
        try {
            if (!newTag.tagName.trim()) return alert("Tag name is required.");
            await axios.put(`${EditTagBaseUrl}/${editTagId}`, {
                id: editTagId,
                ...newTag
            });
            fetchTags();
            resetModal();
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    const handleDeleteTag = async (id) => {
        try {
            await axios.delete(`${GetTagBaseUrl}/${id}`);
            fetchTags();
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    const resetModal = () => {
        setNewTag({
            tagName: '',
            slug: '',
            status: 'Active',
            description: '',
            icon: '',
            categoryId: '',
            subCategoryId: ''
        });
        setIsEditMode(false);
        setEditTagId(null);
        setShowModal(false);
    };

    const iconOptions = [
        ...Object.keys(FaIcons).map(name => ({ value: name, label: name, icon: FaIcons[name] })),
        ...Object.keys(MdIcons).map(name => ({ value: name, label: name, icon: MdIcons[name] })),
        ...Object.keys(Io5Icons).map(name => ({ value: name, label: name, icon: Io5Icons[name] }))
    ];

    const selectedIconOption = iconOptions.find(opt => opt.value === newTag.icon) || null;

    const customSingleValue = ({ data }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            {data.icon && <data.icon style={{ marginRight: 10 }} />}
            {data.label}
        </div>
    );

    const customOption = ({ data, innerRef, innerProps }) => {
        const Icon = data.icon;
        return (
            <div
                ref={innerRef}
                {...innerProps}
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                    cursor: "pointer",
                }}
            >
                {Icon && <Icon style={{ marginRight: 10 }} />}
                {data.label}
            </div>
        );
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: '5px 2px',
            border: '1px solid #c78283',
            borderRadius: '6px',
            color: '#744253',
            width: '100%',
            fontSize: '12px',
            outline: 'none',
            marginBottom: '12px',
            transition: 'border 0.3s ease, box-shadow 0.3s ease',
            boxShadow: state.isFocused ? '0 0 0 2px #c78283' : 'none'
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '8px 12px',
            backgroundColor: state.isFocused ? '#f4d2d3' : 'white',
            color: '#744253',
            cursor: 'pointer',
        })
    };

    return (
        <div className='role-page' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <div className='main-layout'>
                <Sidebar />
                <div className='role-container'>
                    <div className="role-header">
                        <h2>Tags</h2>
                        <div className="role-actions">
                            <button className="search-icon" onClick={() => setShowSearch(prev => !prev)}>
                                <FaSearch />
                            </button>
                            {showSearch && (
                                <input
                                    type="text"
                                    className="search-box"
                                    placeholder="Search tags..."
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            )}
                            <button className='add-role-btn' onClick={() => setShowModal(true)}>
                                <FaPlus /> Add Tags
                            </button>
                        </div>
                    </div>

                    <div className='role-list'>
                        <div className="table-wrapper">
                            <table className='role-table'>
                                <thead>
                                    <tr>
                                        <th>Tag Name</th>
                                        <th>SubTag Name</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags
                                        .filter(tag => tag.tagName.toLowerCase().includes(searchText.toLowerCase()))
                                        .map(tag => (
                                            <tr key={tag.id}>
                                                <td>{tag.tagName}</td>
                                                <td>{tag.subTagName}</td>
                                                <td>
                                                    <span className={`status ${tag.status.toLowerCase()}`}>
                                                        {tag.status}
                                                    </span>
                                                </td>
                                                <td>{tag.description}</td>
                                                <td className='action-buttons'>
                                                    <FaEdit className='icon edit' title='Edit' onClick={() => handleEditClick(tag)} />
                                                    <FaTrash className='icon delete' title='Delete' onClick={() => handleDeleteTag(tag.id)} />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {showModal && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <h3>{isEditMode ? 'Edit Tag' : 'Add New Tag'}</h3>

                                <label>Tag Name</label>
                                <input
                                    type='text'
                                    value={newTag.tagName}
                                    onChange={(e) => setNewTag({ ...newTag, tagName: e.target.value })}
                                />

                                <label>Slug</label>
                                <input
                                    type='text'
                                    value={newTag.slug}
                                    onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                                />

                                <label>Status</label>
                                <select
                                    value={newTag.status}
                                    onChange={(e) => setNewTag({ ...newTag, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                                <label>Choose Icon</label>
                                <Select
                                    options={iconOptions}
                                    value={selectedIconOption}
                                    onChange={(selected) => setNewTag(prev => ({ ...prev, icon: selected ? selected.value : '' }))}
                                    components={{ Option: customOption, SingleValue: customSingleValue }}
                                    isClearable
                                    styles={customStyles}
                                />

                                <label>Category</label>
                                <select
                                    value={newTag.categoryId}
                                    onChange={(e) =>
                                        setNewTag({
                                            ...newTag,
                                            categoryId: e.target.value,
                                            subCategoryId: '' // Reset subcategory when category changes
                                        })
                                    }
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>

                                <label>Sub Category</label>
                                <select
                                    value={newTag.subCategoryId}
                                    onChange={(e) =>
                                        setNewTag({ ...newTag, subCategoryId: e.target.value })
                                    }
                                >
                                    <option value="">Select Subcategory</option>
                                    {subCategories
                                        .filter(sub => sub.categoryId === parseInt(newTag.categoryId))
                                        .map(sub => (
                                            <option key={sub.id} value={sub.id}>
                                                {sub.subCategoryName}
                                            </option>
                                        ))}
                                </select>

                                <label>Description</label>
                                <textarea
                                    value={newTag.description}
                                    onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                                    rows={3}
                                ></textarea>

                                <div className='modal-actions'>
                                    <button onClick={isEditMode ? handleUpdateTag : handleAddTag}>
                                        {isEditMode ? 'Update' : 'Submit'}
                                    </button>
                                    <button className='cancel-btn' onClick={resetModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tag;
