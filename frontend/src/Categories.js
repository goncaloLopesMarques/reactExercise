import React, { Component } from 'react';
import './Categories.css';
import PostList from './PostList.js';

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          categorySelected: "react"
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/categories", { headers: { 'Authorization': 'whatever-you-want' }})
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.categories
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
        )
    }

    changeCategory(category){
        this.setState({ categorySelected : category});
       
    }

  render() {
    const categories=[];
    var catSelected="react";


   
    return (
        <div>
          <div className="col-md-12">
            <div className="col-md-12 text-center pb-3">
                <h3 className="cattitle">Categories</h3>
                {this.state.items.map(category => 
                <span className="p-3 cat" onClick={(e) => this.changeCategory(category.name)} key={category.path}>{category.name}</span>
                )}
            </div>
          </div>
          <PostList categorySelected={this.state.categorySelected}></PostList>
        </div>
        
    );
  }
}

export default Categories;