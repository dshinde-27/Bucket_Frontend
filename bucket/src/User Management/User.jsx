import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import '../Style/role.css';
import bgImage from '../Image/rose.jpg';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import axios from 'axios';

function User() {
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);
    const [adminUser, setAdminUser] = useState(0);
    const [staff, setStaff] = useState(0);
    const [vendor, setVendor] = useState(0);

    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        roleId: '',
        status: 'Active'
    });

    const userApiUrl = 'https://localhost:7086/api/Auth';
    const roleApiUrl = 'https://localhost:7086/api/Role/GetRoles';

    useEffect(() => {
        fetchRoles();
    }, []);

    useEffect(() => {
        if (roles.length > 0) {
            fetchUsers();
        }
    }, [roles]);


    const fetchRoles = async () => {
        try {
            const response = await axios.get(roleApiUrl);
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${userApiUrl}/GetUsers`);
            const userData = response.data;

            console.log('Fetched user data:', userData);
            setUsers(userData);
            setTotalUsers(userData.length);
            setActiveUsers(userData.filter(user => user.status === 'Active').length);
            setInactiveUsers(userData.filter(user => user.status === 'Inactive').length);

            if (roles.length === 0) {
                console.warn('Roles not loaded yet!');
                return;
            }

            const roleMap = roles.reduce((map, role) => {
                map[role.id] = role.name;
                return map;
            }, {});

            const admin = userData.filter(user => roleMap[user.roleId] === 'Admin').length;
            const staff = userData.filter(user => roleMap[user.roleId] === 'Staff').length;
            const vendor = userData.filter(user => roleMap[user.roleId] === 'Vendor').length;

            console.log(`Admin: ${admin}, Staff: ${staff}, Vendor: ${vendor}`);

            setAdminUser(admin);
            setStaff(staff);
            setVendor(vendor);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSaveUser = async () => {
        try {
            if (isEditMode) {
                await axios.put(`${userApiUrl}/EditUser/${editUserId}`, {
                    ...newUser,
                    id: editUserId
                });
            } else {
                await axios.post(`${userApiUrl}/AddUser`, newUser);
            }
            await fetchUsers();
            closeModal();
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${userApiUrl}/${id}`);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        setNewUser({
            username: user.username,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            status: user.status
        });
        setEditUserId(user.id);
        setIsEditMode(true);
        setShowModal(true);
    };

    const openAddModal = () => {
        setNewUser({ username: '', email: '', password: '', roleId: '', status: 'Active' });
        setIsEditMode(false);
        setEditUserId(null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditMode(false);
        setEditUserId(null);
        setNewUser({ username: '', email: '', password: '', roleId: '', status: 'Active' });
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className='role-page' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <div className='main-layout'>
                <Sidebar />
                <div className='role-container'>
                    <div className="role-header">
                        <h2>Users</h2>
                        <div className="role-actions">
                            <button className="search-icon" onClick={() => setShowSearch(prev => !prev)}>
                                <FaSearch />
                            </button>
                            {showSearch && (
                                <input
                                    type="text"
                                    className="search-box"
                                    placeholder="Search users..."
                                    value={searchText}
                                    onChange={e => setSearchText(e.target.value)}
                                />
                            )}
                            <button className='add-role-btn' onClick={openAddModal}>
                                <FaPlus /> Add User
                            </button>
                        </div>
                    </div>

                    <div className="user-stats-card">
                        {[{
                            title: "Total Users", value: totalUsers
                        }, {
                            title: "Active Users", value: activeUsers
                        }, {
                            title: "Inactive Users", value: inactiveUsers
                        }, {
                            title: "Admin", value: adminUser
                        }, {
                            title: "Staff", value: staff
                        }, {
                            title: "Vendor", value: vendor
                        }].map((stat, i) => (
                            <div className="card" key={i}>
                                <FaUserShield className="card-icon" />
                                <div className="card-info">
                                    <h4>{stat.title}</h4>
                                    <p>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='role-list'>
                        <table className='role-table'>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{roles.find(r => r.id === user.roleId)?.name || 'N/A'}</td>
                                        <td>
                                            <span className={`status ${user.status.toLowerCase()}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className='action-buttons'>
                                            <FaEdit className='icon edit' title='Edit' onClick={() => handleEditUser(user)} />
                                            <FaTrash className='icon delete' title='Delete' onClick={() => handleDeleteUser(user.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && (
                        <div className='modal-overlay'>
                            <div className='modal-content'>
                                <h3>{isEditMode ? 'Edit User' : 'Add New User'}</h3>

                                <label>Username</label>
                                <input
                                    type='text'
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                />

                                <label>Email</label>
                                <input
                                    type='email'
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />

                                <label>Password</label>
                                <input
                                    type='password'
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />

                                <label>Role</label>
                                <select
                                    value={String(newUser.roleId)}
                                    onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) })}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>

                                <label>Status</label>
                                <select
                                    value={newUser.status}
                                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                                <div className='modal-actions'>
                                    <button onClick={handleSaveUser}>
                                        {isEditMode ? 'Update' : 'Submit'}
                                    </button>
                                    <button className='cancel-btn' onClick={closeModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default User;
