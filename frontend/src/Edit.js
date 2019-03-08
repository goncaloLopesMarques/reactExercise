import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Edit.css'


class Edit extends Component {
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
            redirect: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/posts/"+this.props.match.params.id, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            author: result.author,
            body: result.body,
            category: result.category,
            commentCount: result.commentCount,
            id: result.id,
            timestamp: result.timestamp,
            title: result.title,
            voteScore: result.voteScore,
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
        fetch("http://localhost:3001/posts/"+this.state.id, 
        { 
            method: 'PUT',
            headers: { 
              'Authorization': 'whatever-you-want',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(
               {
                   'title': this.state.title,
                   'body' : this.state.body
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
      <h2 className="editTitle">Edit Post</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" onChange={this.handleChange.bind(this)} value={this.state.title}></input>
            </div>
            <div className="form-group">
                <label>Author</label>
                <input type="text" className="form-control" readOnly value={this.state.author}></input>
            </div>
            <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control" readOnly value={this.state.category}></input>
            </div>
            <div className="form-group">
                <label>Body</label>
                <textarea type="text" className="form-control" name="body"onChange={this.handleChange.bind(this)} value={this.state.body}></textarea>
            </div>
            <div className="form-group">
                <label>Comment Count</label>
                <input type="text" className="form-control" readOnly value={this.state.commentCount}></input>
            </div>
            <div className="form-group">
                <label>Vote Score</label>
                <input type="text" className="form-control" readOnly value={this.state.voteScore}></input>
            </div>
            <div className="col-md-12 text-left">
                <button type="submit" className="btn btn-primary align-left mr-3"><i className="fa fa-pencil"> Edit</i></button>
                <a href="/" type="button" className="btn btn-outline-dark btn-right align-left mr-3"><i className="fa fa-arrow-left"></i> Voltar</a>
            </div>
        </form>
        
      </div>
    </div>            
    );
  }
}

export default Edit;
