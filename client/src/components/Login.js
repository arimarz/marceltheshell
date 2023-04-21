import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import Paper from '@mui/material/Paper';

const initialValuesSignUp = {
    username: '',
    password: '',
    name: '',
    avator: '',
};

const signUpValidationSchema = Yup.object().shape({
    username: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .test('unique-username', 'This username is already taken', async (value) => {
        const response = await fetch(`/check-username?username=${value}`);
        const data = await response.json();
        return data.isUnique;
    })
    .required('Required'),
    
    password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .matches(/[!@#$%^&*]/, 'Must contain a special character')
    .required('Required'),
    name: Yup.string().required('Required'),
    avatar: Yup.string().required('Required'),
});

function Login({user}) {
    const history = useHistory();
    const [showSignUp, setShowSignUp] = useState(false);

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .min(3, 'Must be at least 3 characters')
        .required('Required'),
        password: Yup.string()
        .required('Required'),
    });

    const handleLogin = async (values, actions) => {
        try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    
        if (response.ok) {
        const user = await response.json();
        sessionStorage.setItem('user', JSON.stringify(user));
        history.push('/profile/'+user.id);
        } else {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'Login failed');
        }
    } catch (error) {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'An error occurred. Please try again.');
    }
    };

    const handleSignUp = async (values, actions) => {
    try {
        const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        });

        if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        //need to update this from localstorage
        history.push('/profile/'+user.id);
        } else {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'Sign-up failed');
        }
    } catch (error) {
        actions.setSubmitting(false);
        actions.setFieldError('general', 'An error occurred. Please try again.');
    }
    };

    const toggleSignUp = () => {
        setShowSignUp(prevState => !prevState);
    }

    return (
        <div style={{  display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '35px',
        left: '50%',
        transform: 'translateX(-50%)' }}>
            <Paper sx={{ padding: 2, borderRadius: 1, boxShadow: 1, backgroundColor: 'rgba(75,88,91,255)' }} elevation={1}>
        <p>LOG IN</p>
        <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
        >
        {props => (
            <Form onSubmit={props.handleSubmit}>
            <div>
            <Field
                type="text"
                name="username"
                placeholder="Username"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
            />
                {props.errors.username && <div id="feedback">{props.errors.username}</div>}
            </div>
            <div>
                <Field
                type="password"
                name="password"
                placeholder="Password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                />
                {props.errors.password && <div id="feedback">{props.errors.password}</div>}
            </div>
            <button type="submit" disabled={props.isSubmitting}>
                Log In
            </button>
            <button type="button" onClick={toggleSignUp}>
                Create Account
            </button>
            {props.errors.general && <div id="feedback">{props.errors.general}</div>}
            </Form>
        )}
        </Formik>
        {showSignUp && (
            <div className="modal">
                <div className="modal-content">
                <button className="close-button" onClick={toggleSignUp}>
                X
                </button>
                <h2>Create an Account</h2>
                <Formik
                initialValues={initialValuesSignUp}
                validationSchema={signUpValidationSchema}
                onSubmit={handleSignUp}
                >
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <div>
                        <Field
                        type="username"
                        name="username"
                        placeholder="Username"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.username}
                        />
                        {props.errors.username && <div id="feedback">{props.errors.username}</div>}
                    </div>
                    <div>
                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                        />
                        {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                    </div>
                    <div>
                        <Field
                        type="name"
                        name="name"
                        placeholder="Name"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    </div>
                    <div>
                        <Field
                        type="avatar"
                        name="avatar"
                        placeholder="Avatar"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.avatar}
                        />
                        {props.errors.avatar && <div id="feedback">{props.errors.avatar}</div>}
                    </div>
                    <button type="submit" disabled={props.isSubmitting}>
                        Create Account
                    </button>
                    <button type="button" onClick={toggleSignUp}>
                        Cancel
                    </button>
                    {props.errors.general && <div id="feedback">{props.errors.general}</div>}
                    </Form>
                    )}
                </Formik>
            </div>
            </div>
        )}
        </Paper>
        </div>
    )
}

export default Login;