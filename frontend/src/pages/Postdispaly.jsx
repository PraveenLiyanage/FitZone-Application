
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function PostDisplay() {
  const [expanded, setExpanded] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [editingComment, setEditingComment] = React.useState(null);
  const [editedCommentText, setEditedCommentText] = React.useState("");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleShareClick = async (id) => {
    const shareUrl = `http://localhost:9191/api/posts/${id}`; // Replace with your post URL

    // Create WhatsApp share link
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareUrl
    )}`;

    // Create Facebook share link
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;

    // Open popup to share on WhatsApp
    window.open(whatsappUrl, "_blank");

    // Open popup to share on Facebook
    window.open(facebookUrl, "_blank");
  };

  const handleLikeClick = () => {
    // Toggle the liked state
    setLiked(!liked);

    // Update the like count based on the current state
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  
  const handleCommentSubmit = () => {
    const cardId = "1234"; // Assuming the card ID is always "1234"

    const commentData = {
      text: newComment,
      cardId: cardId, // Add the known card ID to the comment data
      // Add any other relevant fields for the comment entity
    };

    axios
      .post("http://localhost:9191/api/comments", commentData)
      .then((response) => {
        console.log("Comment saved successfully:", response.data);
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error saving comment:", error);
      });
  };

  const handleCommentUpdate = (commentId) => {
    const updatedComment = {
      id: commentId,
      text: editedCommentText,
      // Add any other relevant fields for the comment entity
    };

    axios
      .put(`http://localhost:9191/api/comments/${commentId}`, updatedComment)
      .then((response) => {
        console.log("Comment updated successfully:", response.data);
        const updatedComments = comments.map((c) =>
          c.id === commentId ? response.data : c
        );
        setComments(updatedComments);
        setEditingComment(null);
        setEditedCommentText("");
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`http://localhost:9191/api/comments/${commentId}`)
      .then(() => {
        console.log("Comment deleted successfully");
        const updatedComments = comments.filter((c) => c.id !== commentId);
        setComments(updatedComments);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };
  const fetchComments = () => {
    axios
      .get("http://localhost:9191/api/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  React.useEffect(() => {
    fetchComments();
  }, []);
  
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
          <Grid item xs={2} sm={4} md={4} key={post.id}>
            <Card sx={{width:400, maxWidth: 500, mt: 2 }}>
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
              <CardContent >
                <Typography variant="body2" color="text.secondary" sx={{height:50}} >
                  {post.postTitle}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="250"
                src={`http://localhost:9191/api/posts/uploads/${post.imagePath}`} // Corrected image path
                alt="Post Image"
              />

                <CardActions disableSpacing>
                 
                    <IconButton
                      aria-label="add to favorites"
                      onClick={handleLikeClick}
                      color={liked ? "secondary" : "default"} // Change color based on liked state
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <span>{likeCount}</span> {/* Display the like count */}
                 
                  <IconButton aria-label="share" onClick={handleShareClick}>
                    <ShareIcon />
                  </IconButton>
                  <TextField
                    label="Add a comment"
                    value={newComment}
                    onChange={handleNewCommentChange}
                    variant="outlined"
                    size="small"
                    style={{ marginLeft: "auto" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </Button>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Comments:</Typography>
                    {comments.map((comment) => (
                      <div key={comment.id}>
                        <Typography paragraph>
                          {editingComment === comment.id ? (
                            <>
                              <TextField
                                value={editedCommentText}
                                onChange={(e) => setEditedCommentText(e.target.value)}
                                variant="outlined"
                                size="small"
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleCommentUpdate(comment.id)}
                              >
                                Update
                              </Button>
                            </>
                          ) : (
                            comment.text
                          )}
                        </Typography>
                        {editingComment !== comment.id && (
                          <>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setEditingComment(comment.id);
                                setEditedCommentText(comment.text);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => handleCommentDelete(comment.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Collapse>
            </Card>
          </Grid>
        ))}
        </Grid>
      </div>
    </section>
  );
}
