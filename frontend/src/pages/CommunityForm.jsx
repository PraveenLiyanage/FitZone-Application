import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

    if (editing && postId) {
      axios.put(`http://localhost:9191/api/communities/${postId}`, data)
        .then(() => {
          console.log('Post updated successfully');
          setEditing(false);
          setPostId(null);
        })
        .catch(error => {
          console.error('Error updating post:', error);
        });
    } else {
      axios.post('http://localhost:9191/api/communities', data)
        .then(() => {
          console.log('Post added successfully');
        })
        .catch(error => {
          console.error('Error adding post:', error);
        });
    }

    // Reset form fields
    setName('');
    setLocation('');
    setTitle('');
    setDescription('');
    fetchPosts(); // Fetch posts again to update the list
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
      });
  };

  return (
    <section>
      <div className="left-section">
        <h2 className='title'>Share Your Workout Plans.</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Publisher Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="location">Publisher Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="title">Community Post Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Community Post Description:</label>
            <div className="quill-container">
                <ReactQuill
                    id="description"
                    value={description}x
                    onChange={setDescription}
                    placeholder="Write your workout plan here..."
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], // Basic text formatting
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Ordered and unordered lists
                            ['link', 'image', 'video'], // Link, image, and video insertion
                            ['clean'] // Remove formatting
                        ]
                    }}
                    formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'link', 'image', 'video']}
                    style={{ height: '300px' }}
                />
            </div>
          </div>
          <br/>
          <div>
            <button type="submit" className="btn">{editing ? 'Update Post' : 'Upload Post'}</button>
          </div>
        </form>
      </div>
      <div>
        <h2 className='title'>Your Previous Posts</h2>
        <div className="card-grid">
          {posts.map(post => (
            <div className="card" key={post.id}>
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.name}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <ReactQuill
                value={post.description}
                readOnly
                modules={{ toolbar: false }}
              /><br/>
              <div className="button-container">
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
