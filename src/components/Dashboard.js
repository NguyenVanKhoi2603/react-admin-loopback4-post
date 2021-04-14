import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, Button } from '@material-ui/core';
import { CardActions } from "ra-ui-materialui";
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const cardStyle = {
    margin: '1em',
    width: 320,
    display: 'inline-block',
    verticalAlign: 'top'
}

const cardStyleHeader = {
    backgroundColor: '#2196f3',
    color: "white"
}
const colorGB = '#2196f3';
const cardStyleButton = {
    color: '#2196f3',
}

function UserTotal() {
    const [name, setName] = useState(0);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}` },
        };
        fetch("http://localhost:3000/users/count", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.count)
                },
                (error) => {
                }
            )
    });
    return (<span>{name}</span>)
}

function CommentTotal() {
    const [comment, setComment] = useState(0);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}` },
        };
        fetch("http://localhost:3000/comments/count", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setComment(result.count)
                },
                (error) => {
                }
            )
    });
    return (<span>{comment}</span>)
}

function PostTotal() {
    const [post, setPost] = useState(0);
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token')).token}` },
        };
        fetch("http://localhost:3000/posts/count", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setPost(result.count)
                },
                (error) => {
                }
            )
    });
    return (<span>{post}</span>)
}

export default () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
            <div>
                <Card style={cardStyle}>
                    <CardHeader style={cardStyleHeader} title="Total Posts" />
                    <CardContent >
                        {<PostTotal />}
                    </CardContent>
                    <CardActions>
                        <Button
                            component={Link}
                            to="/posts" style={cardStyleButton}>
                            View Detail
                                <ArrowForwardIcon style={{ alignSelf: 'center', color: `${colorGB}` }} />
                        </Button>

                    </CardActions>
                </Card>
                <Card style={cardStyle}>
                    <CardHeader style={cardStyleHeader} title="Total Comments" />
                    <CardContent style={{ flex: 'none' }}>
                        {<CommentTotal></CommentTotal>}
                    </CardContent>
                    <CardActions>
                        <Button
                            component={Link}
                            to="/comments" style={cardStyleButton}>
                            View Detail
                                <ArrowForwardIcon style={{ alignSelf: 'center', color: `${colorGB}` }} />
                        </Button>
                    </CardActions>
                </Card>
                <Card style={cardStyle}>
                    <CardHeader style={cardStyleHeader} title="Total Users" />
                    <CardContent>
                        {<UserTotal></UserTotal>}
                    </CardContent>
                    <CardActions>
                        <Button
                            component={Link}
                            to="/users" style={cardStyleButton}>
                            View Detail
                                <ArrowForwardIcon style={{ alignSelf: 'center', color: `${colorGB}` }} />
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </CardContent>
    </Card>
)