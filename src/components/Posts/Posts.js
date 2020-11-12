import React, { useState, useEffect, useReducer } from 'react';
import { Card, Button, Comment } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import './Posts.css'

function getCommentsAction(id) {
    return { type: 'GET_COMMENTS', comment_id: id }
}

const Comments = (props) => {

    const comments = useSelector(state => {
        console.log(state);
        state.data.slice(0, state.data.length)
    });

    return (
        <> 
            {
                comments.map((comment, index) => (
                    <Comment
                        author={<a>John Doe</a>}
                        key={index}
                        content={
                            <p className="comment-body">
                                <MessageOutlined /> {comment}
                            </p>
                        }
                    />
                ))
            }
        </>
    );

}

const SendComment = (comment, id) => {

    fetch('http://localhost:3030/posts/comments', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment: comment, id: id})
    }).then(res => res.json())
    .then(res => console.log(res.desc))

}

export default function Posts() {

    const [data, setData] = useState([]);
    const [lastClick, setLast] = useState(0);
    const [clicks, setClick] = useState(1);
    const dispatch = useDispatch();

    function getcomments(id) {
        dispatch(getCommentsAction(id));
    }

    useEffect(() => {

        fetch('http://localhost:3030/posts')
        .then(res => res.json())
        .then(res => setData(res));

    }, []);

    return (
        <>

            {
                data.map(post => (
                    <Card 
                        className="post-container" 
                        key={post.id}
                    >   
                        <hr />
                            <div className="content">
                                {post.message}
                            </div>

                        <hr />

                        <Comments id={post.id} />

                        <textarea className="comment-field">

                        </textarea>

                        <Button 
                            className="comment-btn"
                            onClick={() => {
                                setClick(clicks + 1);
                                setLast(lastClick + 1);
                                getcomments(post.id);

                                setTimeout(() => {
                                    SendComment(`clicks: ${clicks}, last: ${lastClick}`, post.id);
                                }, 1000);
                            }}
                        >
                            Comentar
                        </Button>

                    </Card>
                ))
            }
            
        </>
    );
}