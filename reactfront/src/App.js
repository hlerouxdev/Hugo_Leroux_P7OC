
import React from "react";
import moment from 'moment'
import './post.css'
moment.locale('fr')
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
              console.log(posts)
                this.setState({
                    posts: posts,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, posts } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Veuillez patienter.... </h1> </div> ;
  
        return (
        <div className = "App">
            <h1> Posts Groupomania </h1>  {
                posts.map((post) => ( 
                  <ol key = { post.id } class="post">
                    <div class="post-header">
                      <img class="post-user-avatar" src={ post.User.profilePicture } alt={ post.User.firstName + ' ' + post.User.lastName }></img>
                      <div class="post-header-infos">
                        <h2 class="post-user-name">
                          { post.User.firstName + ' ' + post.User.lastName }
                        </h2>
                        <p>
                          created at: { moment(post.createdAt).format('Do MMMM YYYY [à] HH:mm') } 
                        </p>
                      </div>
                    </div>
                    <h3>
                      { post.content }
                    </h3>
                    <img class="post-image" src={ post.filePath } alt={ post.content + ' ' + post.User.firstName + ' ' + post.User.lastName }></img>
                    <div class="post-line"></div>
                    <div class="post-footer">
                      <div>
                        <p>{ post.Likes.length }</p>
                        <i></i>
                      </div>
                      <p>{ post.Comments.length } commentaires</p>
                    </div>
                  </ol>
                ))
            }
        </div>
    );
}
}
   
export default App;