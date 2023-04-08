import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

function Profile({user}) {
    const [editMode, setEditMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

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
    console.log(posts)
        const postsToDisplay = posts?.map((post) => {
            return (
            <li key={post.id}>
                <img src={post.image} alt="Post Image" />
                <p>{post.quote}</p>
            </li>
            );
        });

    if (!isLoaded) return <h1>Loading...</h1>;

    return (
        <div>
            <h3>{username}</h3>
            <h3>{name}</h3>
            <img src={avatar} alt="User Avatar" />
            {thisUser?<button onClick={handleClickEdit}>{editMode?'Close Editor Without Saving':'Edit Profile'}</button>:''}
                    {editMode?<div className='profile-edit'>
                        <form onSubmit={formik.handleSubmit}>
                            <label >Userame</label>
                            <input type="text"  name="username" value={formik.values.username} onChange={formik.handleChange} />
                            <label >Name</label>
                            <input type="text"  name="name" value={formik.values.name} onChange={formik.handleChange} />
                            <label >Avatar</label>
                            <input type="text"  name="avatar" value={formik.values.avatar} onChange={formik.handleChange} />
                            <input type='submit' value='Save' />
                        </form>
                    </div>:''}
            <div>
                <h3>Posts:</h3>
                <ul >{postsToDisplay}</ul>
            </div> 
        </div>
    );
}


export default Profile;