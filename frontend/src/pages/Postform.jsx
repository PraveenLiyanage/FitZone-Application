
import React, { useState, useEffect  } from "react"; 
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export default function Postform() {
  const [publisherName, setPublisherName] = useState("");
  const [location, setLocation] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:9191/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("publisherName", publisherName);
    formData.append("location", location);
    formData.append("postTitle", postTitle);
    formData.append("file", file);

    try {
        await axios.post("http://localhost:9191/api/posts/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Post uploaded successfully!");
    } catch (error) {
        alert("Failed to upload post: " + error.message);
    }
};


  return (
    <div>
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={12} md={6}>
        <CssBaseline />
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Share Your Posts
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="publisherName"
                    label="Publisher Name"
                    name="publisherName"
                    value={publisherName}
                    onChange={(e) => setPublisherName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="postTitle"
                    label="Description"
                    name="postTitle"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{ mt: 3 }}
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Upload Post
              </Button>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>


    <div style={{marginTop:'-20%',marginBottom:'20%'}}>
        <h2 className='title'>Your Previous Posts</h2>
        <div className="card-grid">
          {posts.map(post => (
            <div className="card" key={post.id}>
              <h3><strong>User:</strong> {post.publisherName}</h3>
              
              <p>{post.postTitle}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <img src={post.imagePath} alt={post.title} />
              {/* <ReactQuill
                value={post.description}
                readOnly
                modules={{ toolbar: false }}
              /><br/> */}
              <div className="button-container">
               <button >Edit</button> {/*  onClick={() => handleEdit(post.id)} */}
                <button >Delete</button>  {/* onClick={() => handleDelete(post.id)}*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

