import React, { Component } from 'react';
import './PostList.css';
import Post from './Post.js';
import { BrowserRouter, Route, Link } from 'react-router-dom';


class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      items: [],
      categorySelected:'',
      categoryCss:[],
      sortByScore:[],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/categories", { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.categories,
              categorySelected: result.categories[0].name
            });
            fetch("http://localhost:3001/posts", { headers: { 'Authorization': 'whatever-you-want' }})
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  posts: result
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
          });
      }
    )
  }
  sortByScore(order){
    if(order === 1){
      this.setState({
        posts: this.state.posts.sort(function(a, b){return a.voteScore - b.voteScore})
      });
    }else{
      this.setState({
        posts: this.state.posts.sort(function(a, b){return b.voteScore - a.voteScore})
      });
    }
  }

  sortByTimeStamp(order){
    if(order === 1){
      this.setState({
        posts: this.state.posts.sort(function(a, b){return a.timestamp - b.timestamp})
      });
    }else{
      this.setState({
        posts: this.state.posts.sort(function(a, b){return b.timestamp - a.timestamp})
      });
    }
  }

  upVote(id,index){
    fetch("http://localhost:3001/posts/"+id, 
    { 
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({'option':'upVote'}),
    })
    .then(res => res.json())
    .then(
      (result) => {
        var arrayAux = [this.state.posts];
        arrayAux[0].splice(index,1, result);
        this.setState({
          isLoaded: true,
          posts: arrayAux[0]
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }
  downVote(id,index){
    fetch("http://localhost:3001/posts/"+id, 
    { 
      method: 'POST',
      headers: { 
        'Authorization': 'whatever-you-want',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({'option':'downVote'}),
    })
    .then(res => res.json())
    .then(
      (result) => {
        var arrayAux = [this.state.posts];
        arrayAux[0].splice(index,1, result);
        this.setState({
          isLoaded: true,
          posts: arrayAux[0]
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  deletePost(id){
    fetch("http://localhost:3001/posts/"+id,
     { 
      method:'DELETE',
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(res => res.json())
    .then(
      (result) => {
        //passar este codigo para uma função para evitar a duplicação de codigo!
        fetch("http://localhost:3001/"+this.state.categorySelected+"/posts", { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              posts: result,
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  render() {
    return (
    <div className="">
      <div className="col-md-12">
        <div className="col-md-12 text-center pb-3">
          <h3 className="cattitle">Categories</h3>
          <span className="p-3 cat catSelected">All</span>
          {this.state.items.map((category, index) => 
          <a className="p-3 cat all" href={"/postByCategory/"+category.path} key={index}>{category.name}</a>
          )}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-3"></div>
         <div className="col-md-6 postList text-center">
          <div className="row">
          <div className="col-md-12 text-center mb-5">
            <span>Create New Post 
            <a className="btn btn-primary mr-3 ml-2"
              href="/newPost" ><i className="fa fa-plus-circle"></i></a>
              </span>
          </div>
          </div>
         <span>Order by: </span>
         <button type="button" className="btn btn-primary mr-3"
            onClick={(e) => this.sortByScore(1)} ><i className="fa fa-arrow-up"></i><i className="fa fa-star"></i></button>
          <button type="button" className="btn btn-primary mr-3"
            onClick={(e) => this.sortByScore(2)} ><i className="fa fa-arrow-down"></i><i className="fa fa-star"></i></button>
            <button type="button" className="btn btn-primary mr-3"
            onClick={(e) => this.sortByTimeStamp(1)} ><i className="fa fa-arrow-up"></i><i className="fa fa-clock-o"></i></button>
          <button type="button" className="btn btn-primary"
            onClick={(e) => this.sortByTimeStamp(2)} ><i className="fa fa-arrow-down"></i><i className="fa fa-clock-o"></i></button>
         {this.state.posts.map((post, index) =>
         <div className="card text-center mt-5">
         <div className="card-header postTitle text-left">{post.title}
            <a href={'/edit/' + post.id} type="button" className="btn btn-outline-dark btn-right"><i className="fa fa-pencil"></i></a>
            <span onClick={(e) => this.deletePost(post.id)} type="button" className="btn btn-outline-dark btn-right"><i className="fa fa-trash"></i></span>
            <a href={'/view/' + post.id} type="button" className="btn btn-outline-dark btn-right"><i className="fa fa-eye"></i></a>
          </div>  
         <div className="card-body postBody">
         <p className="card-text">{post.body}</p>
         </div>
         <div className="card-footer text-muted fontSize">
          <div className="row">
            <div className="col-md-3"><span className="footerFont"><i className="fa fa-user"></i> </span> {post.author}</div>
            <div className="col-md-2"><span className="footerFont"><i className="fa fa-comment"></i> </span>  {post.commentCount}</div>
            <div className="col-md-2"><span className="footerFont"><i className="fa fa-star"></i></span>{post.voteScore}</div>
            <div className="col-md-1"></div>
            <div className="col-md-2"><button type="button" className="btn btn-success"
                                        onClick={(e) => this.upVote(post.id,index)} ><i className="fa fa-thumbs-up"></i></button></div>
            <div className="col-md-2"><button type="button" className="btn btn-danger"
                                        onClick={(e) => this.downVote(post.id,index)}><i className="fa fa-thumbs-down"></i></button></div>
          </div>
         </div>
         </div>
          )}
         </div>
         <div className="col-md-3"></div>
      </div>
    </div>
    );
  }
}



export default PostList;