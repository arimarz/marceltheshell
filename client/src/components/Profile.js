import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';
import Video from './Video';
import { Grid, Avatar, Card, CardHeader, Typography } from "@mui/material";
import { Box } from '@chakra-ui/react'
import UserContext from './UserContext';
import DeleteIcon from '@mui/icons-material/Delete';


function Profile({user}) {
    const [editMode, setEditMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const userGrab = useContext(UserContext)

    const history = useHistory();

    const {id} = useParams();

    const thisUser = user?user.id===parseInt(id):false
    
    const [profile, setProfile] = useState({
        "username":'',
        "name":'',
        "avatar":''
    });
    
    
    function handleClickEdit(){
        setEditMode(current=>!current)
    }
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: profile.username,
            name: profile.name,
            avatar: profile.avatar
        },
        onSubmit: (values) => {
            handleClickEdit();
            fetch(`/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setProfile(data)
                        history.push('/profile/'+id)
                    })
                } else {
                    res.json().then(error => console.log(error.message))
                };
        })
        }
    })

    useEffect(()=>{
        setIsLoaded(false)
        setEditMode(false)
        fetch('/users/'+id)
        .then(res=>res.json())
        .then((data) => {
            setProfile(data);
            setIsLoaded(true);
        })
    }, [id])

    
    const {username, name, avatar, posts} = profile
    const postsToDisplay = posts?.map((post, index) => {
        console.log(post.image)
        return (
        <Card sx={{backgroundColor: '#b4b4ac', marginBottom: '30px',}}>
                    <CardHeader
                        sx={{ fontSize: '5rem' }} 
                        avatar={<Avatar src={avatar} sx={{ width: 70, height: 70, borderRadius: '50%', border: '3px solid #544a2a' }} />} 
                        title={
                            <Typography variant="h4" fontWeight="bold">
                                {post.quote}
                            </Typography>
                        }
                        action={ <DeleteIcon sx={{ fontSize: '3rem', color: '#645c5c' }}/> }
                    />
                    <Box display="flex" justifyContent="center">
                        <Video image={`/${post.image}`} />
                    </Box>
                </Card>
        )});

    if (!isLoaded) return <h1>Loading...</h1>;

    return (
        <div>
        <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                marginTop="20px"
                marginBottom="20px"
                >
                <Avatar src={avatar} sx={{ width: 200, height: 200, marginRight: "20px" }} />
                <Box display="flex" flexDirection="column">
                    <h1>Name: {name}</h1>
                    <h1>User: {username}</h1>
                    {thisUser ? (
                    <button onClick={handleClickEdit}>
                        {editMode ? "Close Editor Without Saving" : "Edit Profile"}
                    </button>
                    ) : (
                    ""
                    )}
                    {editMode ? (
                    <div className="profile-edit">
                        <form onSubmit={formik.handleSubmit}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        <label>Avatar</label>
                        <input
                            type="text"
                            name="avatar"
                            value={formik.values.avatar}
                            onChange={formik.handleChange}
                        />
                        <input type="submit" value="Save" />
                        </form>
                    </div>
                    ) : (
                    ""
                    )}
                </Box>
                </Box>
            <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                <Typography variant="h3" align="center">
                    Posts:
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={3} md={8}>
                    <ul>{postsToDisplay}</ul>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            </div> 
        </div>
    );
}


export default Profile;