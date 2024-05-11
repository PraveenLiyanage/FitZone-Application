import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../assets/css/CommunityDisplay.css';

function CommunityForm() {
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  // const [title, setTitle] = useState('');
  // const [editing, setEditing] = useState(false);
  // const [postId, setPostId] = useState(null);
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



  return (
    <section className='secdisplay'>
      <div>
        <h2>Workout Plans</h2>
        <a href="/communityform">
          <button className="button">Add Your Workout Plan Here</button>
          </a>
        <div class="card-grid">
          {posts.map(post => (
            <div class="card" key={post.id}>
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.name}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <ReactQuill
                value={post.description}
                readOnly
                modules={{ toolbar: false }}
                style={{ height: '550px' }}
              />
              <div class="button-container">
                {/* <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CommunityForm;
