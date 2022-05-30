
import React from "react";
import CreatePost from "./components/CreatePost";
import './post.css'

import Post from './components/Post'

class App extends React.Component {

  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/posts/")
      .then((res) => res.json())
      .then((posts) => {
        this.setState({
          posts: posts.reverse(),
          DataisLoaded: true
        });
      })
  }
  render() {
    const { DataisLoaded, posts } = this.state;
    if (!DataisLoaded) return <div>
      <h1> Veuillez patienter.... </h1> </div>;

    return (
      <div className="App">
        <h1> Posts Groupomania </h1>  
        <CreatePost />
        {
          posts.map((post) => (
            <ol key={post.id} class="post">
              <Post post={ post } class={'post' + post.id}/>
            </ol>
          ))
        }
      </div>
    );
  }
}

export default App;