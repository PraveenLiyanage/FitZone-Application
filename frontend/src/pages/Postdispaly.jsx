import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from '@mui/material';

export default function PostDisplay() {
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

  return (
    <section className='secdisplay'>
      <div>
        <h2>Share Your Posts</h2>
        <a href="/Postform">
          <button className="button">Add posts Here</button>
        </a>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
        {posts.map(post => (
          
          <Grid item xs={2} sm={3} md={3}>
          <Card key={post.id} sx={{ maxWidth: 450, mt: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.publisherName}
              subheader={post.location}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.postTitle}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="150"
              image={post.imagePath}// Adjust the URL accordingly
              alt="Post Image"
            />
            {/* <img src={post.imagePath}></img> */}
          </Card>
          </Grid>
         
        ))}
        </Grid>
      </div>
    </section>
  );
}
