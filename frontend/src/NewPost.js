import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Edit.css'


class NewPost extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            author:'',
            body:'',
            category:'',
            commentCount:'',
            id:'',
            timestamp:'',
            title:'',
            voteScore:'',
            redirect: false,
            allCategories:[]
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/categories", { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
          console.log(result)
          this.setState({
              allCategories: result.categories
          });
          },
          (error) => {
             console.log(error)
          }
        )
    }

    handleChange(event) {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const uuidv1 = require('uuid/v1');
        fetch("http://localhost:3001/posts", 
        { 
            method: 'POST',
            headers: { 
              'Authorization': 'whatever-you-want',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(
               {
                   'title'     : this.state.title,
                   'body'      : this.state.body,
                   'author'    : this.state.author,
                   'id'        : uuidv1(),
                   'timestamp' : Date.now(),
                   'category'  : this.state.category,
                }
            ),
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({ redirect: true })
          },
          (error) => {
             console.log(error)
          }
        )
      }
  render() {
    const { redirect } = this.state;
    
    if (redirect) {
        return <Redirect to='/'/>;
      }
    return (
    <div className="container">
      <div className="col-md-12">
      <h2 className="editTitle">New Post</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" onChange={this.handleChange.bind(this)} value={this.state.title}></input>
            </div>
            <div className="form-group">
                <label>Author</label>
                <input type="text" className="form-control" name="author" onChange={this.handleChange.bind(this)} value={this.state.author}></input>
            </div>
            <div className="form-group">
                <label>Category</label>
                <select name="category" value={this.state.category} onChange={this.handleChange.bind(this)}>
                {this.state.allCategories.map(category =>
                    <option value={category.name}>
                        {category.name}
                    </option>
                )}
                </select>
            </div>
            <div className="form-group">
                <label>Body</label>
                <textarea type="text" className="form-control" name="body"onChange={this.handleChange.bind(this)} value={this.state.body}></textarea>
            </div>
            <div className="col-md-12 text-left">
                <button type="submit" className="btn btn-primary align-left mr-3"><i className="fa fa-plus-circle"> Creat</i></button>
                <a href="/" type="button" className="btn btn-outline-dark btn-right align-left mr-3"><i className="fa fa-arrow-left"></i> Voltar</a>
            </div>
        </form>
      </div>
    </div>            
    );
  }
}

export default NewPost;
