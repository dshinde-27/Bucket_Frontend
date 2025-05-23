import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Sidebar from '../Layout/Sidebar';
import Navbar from '../Layout/Navbar';
import bgImage from '../Image/rose.jpg';

function Author() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch authors from API on mount
  useEffect(() => {
    fetch('https://localhost:7086/api/Author/get-authors')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch authors');
        return res.json();
      })
      .then((data) => {
        // Data format example:
        // [{ id, authorImage, attributeName, products: [], status }]
        setAuthors(
          data.map((author) => ({
            ...author,
            values: author.products.map((p) => ({ value: p })),
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (author) => {
    // Navigate or open modal
    console.log('Edit author:', author);
  };

  const handleDeleteTag = (id) => {
    // Add confirmation and deletion logic
    console.log('Delete author with ID:', id);
  };

  // Filter authors by name
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
            {loading ? (
              <p>Loading authors...</p>
            ) : (
              <div className="table-wrapper">
                <table className="role-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Author Image</th>
                      <th>Author Name</th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((author) => (
                        <tr key={author.id}>
                          <td>{author.id}</td>
                          <td>
                            {author.authorImage ? (
                              <img
                                src={author.authorImage}
                                alt={author.attributeName}
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                              />
                            ) : (
                              <span>No Image</span>
                            )}
                          </td>
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
                        <td colSpan="6" style={{ textAlign: 'center', color: '#999' }}>
                          No authors found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
