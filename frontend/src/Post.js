import React, { Component } from 'react';
import './Post.css';

class Post extends Component {

  render() {
    return (
      <div className="col-md-12">
      {this.props.posts.map(post =>
         <div className="card text-center">
         <div className="card-header postTitle">{post.title}</div>
         <div className="card-body postBody">
         <p className="card-text">{post.body}</p>
         </div>
         <div className="card-footer text-muted">
          <div className="row">
            <div className="col-md-3">Author: {post.author}</div>
            <div className="col-md-2">Comments: {post.commentCount}</div>
            <div className="col-md-2">Score:{post.voteScore}</div>
            <div className="col-md-1"></div>
            <div className="col-md-2"><button type="button" class="btn btn-success">+</button></div>
            <div className="col-md-2"><button type="button" class="btn btn-danger">-</button></div>
          </div>
         </div>
         </div>
          )}
      </div>              
    );
  }
}

export default Post;
