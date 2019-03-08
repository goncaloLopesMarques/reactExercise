import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Edit.css'
import './View.css'


class View extends Component {
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
            comments: [],
            redirect: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/posts/"+this.props.match.params.id, { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
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
          this.fetchComments()
          },
          (error) => {
             console.log(error)
          }
        )
    }
    fetchComments(){
        fetch("http://localhost:3001/posts/"+this.props.match.params.id+"/comments", { headers: { 'Authorization': 'whatever-you-want' }})
        .then(res => res.json())
        .then(
          (result) => {
          this.setState({
           comments: result
          });
          
          },
          (error) => {
             console.log(error)
          }
        )
    }

    deleteComment(id){
        fetch("http://localhost:3001/comments/"+id, 
        { 
          method: 'DELETE',
          headers: { 
            'Authorization': 'whatever-you-want',
            'Content-Type': 'application/json'
          },
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.fetchComments();
            console.log("Comentario Apagado com sucesso!")
          },
          (error) => {
            console.log(error)
          }
        )
    }

    upVote(id){
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
            this.setState({
                voteScore: result.voteScore
              });
          },
          (error) => {
            console.log(error)
          }
        )
      }

      upVoteComment(id,index){
        fetch("http://localhost:3001/comments/"+id, 
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
            var arrayAux = [this.state.comments];
            arrayAux[0].splice(index,1, result);
            this.setState({
              isLoaded: true,
              comments: arrayAux[0]
            });
          },
          (error) => {
            console.log(error)
          }
        )
      }
      downVote(id){
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
            this.setState({
              voteScore: result.voteScore
            });
          },
          (error) => {
            console.log(error)
          }
        )
    }
    downVoteComment(id,index){
        fetch("http://localhost:3001/comments/"+id, 
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
            var arrayAux = [this.state.comments];
            arrayAux[0].splice(index,1, result);
            this.setState({
              comments: arrayAux[0]
            });
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
      <h2 className="editTitle">View Post</h2>
        <form>
        <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" readOnly value={this.state.title}></input>
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
                <textarea type="text" className="form-control" readOnly value={this.state.body}></textarea>
            </div>
            <div className="form-group">
                <label>Comment Count</label>
                <input type="text" className="form-control" readOnly value={this.state.commentCount}></input>
            </div>
            <div className="form-group">
                <label>Vote Score</label>
                <input type="text" className="form-control" readOnly value={this.state.voteScore}></input>
            </div>
        </form>
      </div> 
      <div className="container">
        <div className="row">
            <div className="col-md-12 mb-5 mt-2">
                <a href="/" type="button" className="btn btn-outline-dark btn-right align-left"><i className="fa fa-arrow-left"></i> Voltar</a>
                <button type="button" className="btn btn-success align-left mr-3"
                    onClick={(e) => this.upVote(this.state.id)} ><i className="fa fa-thumbs-up"></i></button>
                <button type="button" className="btn btn-danger align-left mr-3"
                    onClick={(e) => this.downVote(this.state.id)}><i className="fa fa-thumbs-down"></i></button>
            </div>
        </div>
       </div> 
       
	    <h2 className="text-center">Comments</h2>
            {this.state.comments.map((comment,index) =>
        <div className="container mt-5 fontColor">
        <div className="card">
	      <div className="card-body">
	        <div className="row">
        	    <div className="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
        	        <p className="text-secondary text-center">{comment.timestamp}</p>
        	    </div>
        	    <div className="col-md-8">
        	        <p>
        	            <a className="float-left"><strong>{comment.author}</strong></a>
        	       </p>
        	       <div className="clearfix"></div>
        	        <p>{comment.body}</p>
	        </div>
            <div className="col-md-2">
            <div className="row rightItems">
            <span className="float-right"><i className="text-warning fa fa-star"></i>{comment.voteScore}</span>
            <button className="float-right btn btn-danger ml-4" onClick={(e) => this.deleteComment(comment.id)}>
                <i className=" fa fa-trash"></i>
            </button>
            </div>
            <div className="row bottomItems">
                        <button className="float-right btn text-white btn-primary" onClick={(e) => this.upVoteComment(comment.id,index)}> 
                            <i className="fa fa-thumbs-up"></i> Like
                        </button>
        	            <button className="float-right btn btn-outline-danger ml-2" onClick={(e) => this.downVoteComment(comment.id,index)}>
                         <i className="fa fa-thumbs-down"></i> Dislike
                        </button>
                        </div>
                   </div>
        	    </div>
	     </div>
    	</div>
     </div>
    )}
    </div>          
    );
  }
}

export default View;
