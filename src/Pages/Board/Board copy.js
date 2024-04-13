import { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import { response } from "express";
import { Link } from "react-router-dom";

function Board() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //서버에서 게시글을 가져옴
    axios.get('http://localhost:4000/posts')
    .then(response => setPosts(response.data))
    .catch(error => console.error('Error fetching posts:', error));
  }, []);



  return (
    
      <div className="Board">
        {/* <Navigation></Navigation> */}
        <Navigation></Navigation>
        <h>게시판입니다.</h>
        <h2>게시글 목록
          <ul>
            {posts.map(post =>(
              <li key={post.id}>
                <Link to={`/posts${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </h2>
      </div>

      
  );
}

export default Board;
