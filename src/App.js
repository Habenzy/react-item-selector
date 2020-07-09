import React from 'react';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      postsData: [],
      selectedPost: null
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((postCollection) => {
        this.setState({ postsData: postCollection })
      })
  }

  selectPost = (post) => {

    this.setState({ selectedPost: post })

  }

  render() {
    return (
      <div>
        <PostList posts={this.state.postsData} select={this.selectPost} />
        <PostDisplay post={this.state.selectedPost} />
      </div>
    )
  }
}

function PostList(props) {
  return (
    <ul>
      {props.posts.map((post, index) => {
        return <li
          key={index}
          onClick={(evt) => {
            evt.preventDefault();
            props.select(post)
          }
          }>
          {post.title}
        </li>
      })}
    </ul>
  )
}

function PostDisplay(props) {
  if (props.post) {
    return (
      <div id='container'>
        Title: {props.post.title}
        <br />
        Content: {props.post.body}
      </div>
    )
  } else {
    return <div id='container'>No Post Selected</div>
  }
}

export default App;
