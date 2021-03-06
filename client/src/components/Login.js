import React from "react";
import Header from "./Header";
import { Toast, ToastContainer } from "react-bootstrap";
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import axios from '../api/axios';
import "../css/Login.css";
const LOGIN_URL = '/login';


const Login = () =>{
    const { auth, setAuth, keepLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/robots";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    useEffect(() => {
        if (auth?.accessToken) {
            navigate(from, { replace: true });
        }
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    

    const handleSubmit = async (e) => {
        console.log("submit");
        e.preventDefault();

        

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({
                    username: user,
                    password: pwd
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            console.log(typeof(response), response);
            //console.log(response?.data?.token[1])
            const accessToken = response?.data?.token[0];
            const user_id = response?.data?.token[1];
            if (!accessToken) {
                throw new Error('Access token not found.');
            }
            const userLogin = { user: user, pwd, accessToken, user_id };
            setAuth(userLogin);
            keepLogin(userLogin);
            setUser('');
            setPwd('');
            console.log(from, accessToken);
            navigate('/robots');
        } catch (err) {  
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 403) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    
    return(
        
        <div>
            <ToastContainer position="top-center">
            <Toast  onClose={() => setErrMsg(false)} show={errMsg} delay={3000} autohide>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Warning</strong>
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{errMsg}</Toast.Body>
            </Toast>
            </ToastContainer>
            <section>
            {/*<Alert variant="light">{errMsg}</Alert>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>*/}
            <p  aria-live="assertive"></p>
            <h1 className="title">Sign In As</h1>
            <div className="button b2" id="button-10">
                <input type="checkbox" className="checkbox" />
                <div className="knobs">
                    <span>Manufacturer</span>
                </div>
                <div className="layer"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="form-group">
                    
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="form-group">
            
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            placeholder="Password"
                            required
                        />
                    </div>
                    

                   <button className="sign-in" state={user} onClick={errMsg}>Sign In</button> 
                </div>
                
            </form>
        
        </section>
        <div className="robot-pic-container">
            <img className="robot-pic" src={require("../assets/landingpage.png")}></img>
        </div>
        </div>
    );
}

export default Login;