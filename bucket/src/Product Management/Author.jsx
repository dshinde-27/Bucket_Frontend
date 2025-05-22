import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';

function Author() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const authors = [
    {
      id: 1,
      attributeName: 'John Doe',
      values: [{ value: 'Book A' }, { value: 'Book B' }],
      status: 'Approved',
    },
    {
      id: 2,
      attributeName: 'Jane Smith',
      values: [{ value: 'Book C' }],
      status: 'Pending',
    },
  ];

  const handleEditClick = (author) => {
    // TODO: navigate(`/edit-author/${author.id}`) or open modal
    console.log('Edit author:', author);
  };

  const handleDeleteTag = (id) => {
    // TODO: add confirmation and deletion logic
    console.log('Delete author with ID:', id);
  };

  const filteredAuthors = authors.filter((author) =>
    author.attributeName.toLowerCase().includes(searchText.toLowerCase())
  );

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
            <h2>Authors</h2>
            <div className="role-actions">
              <button className="search-icon" onClick={() => setShowSearch(!showSearch)}>
                <FaSearch />
              </button>
              {showSearch && (
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search authors..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              )}
              <button className="add-role-btn" onClick={() => navigate('/add-author')}>
                <FaPlus /> Add Author
              </button>
            </div>
          </div>

          <div className="role-list">
            <div className="table-wrapper">
              <table className="role-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Author Name</th>
                    <th>Books</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAuthors.length > 0 ? (
                    filteredAuthors.map((author) => (
                      <tr key={author.id}>
                        <td>{author.id}</td>
                        <td>{author.attributeName}</td>
                        <td>{author.values.map((v) => v.value).join(', ')}</td>
                        <td>
                          <span className={`status ${author.status.toLowerCase()}`}>
                            {author.status}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <FaEdit
                            className="icon edit"
                            title="Edit"
                            onClick={() => handleEditClick(author)}
                          />
                          <FaTrash
                            className="icon delete"
                            title="Delete"
                            onClick={() => handleDeleteTag(author.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>
                        No authors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
