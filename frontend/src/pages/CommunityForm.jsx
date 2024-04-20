import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/CommunityForm.css';

function CommunityForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const [postId, setPostId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:9191/api/communities')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, description, location, title };

    axios.post('http://localhost:9191/api/communities', data)
      .then(() => {
        console.log('Post added successfully');
        setName('');
        setLocation('');
        setTitle('');
        setDescription('');
        fetchPosts(); // Fetch posts again to update the list
      })
      .catch(error => {
        console.error('Error adding post:', error);
        // Handle error - display error message to the user
      });
  };

  const handleEdit = (id) => {
    setEditing(true);
    setPostId(id);
    const postData = posts.find(post => post.id === id);
    if (postData) {
      setName(postData.name);
      setLocation(postData.location);
      setTitle(postData.title);
      setDescription(postData.description);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9191/api/communities/${id}`)
      .then(() => {
        console.log('Post deleted successfully');
        fetchPosts(); // Fetch posts again to update the list
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        // Handle error - display error message to the user
      });
  };

  return (
    <section>
      <div className="left-section">
        <h2>Upload Your Community Post.</h2>
        <form onSubmit={editing ? handleEdit : handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Publisher Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Publisher Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="title">Community Post Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Community Post Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <button type="submit" className="btn">Upload Post</button>
          </div>
        </form>
      </div>
      <div>
        <h2>Your Previous Posts</h2>
        <div class="card-grid">
          {posts.map(post => (
            <div class="card" key={post.id}>
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.name}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <p>{post.description}</p>
              <div class="button-container">
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CommunityForm;
