import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setErrors(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((e) => {
                const response = e.response;
                if (response && response.status === 422) {
                    if(response.data.errors){

                        setErrors(response.data.errors);
                       
                    }
                    else if(response.data.message) {
                        setErrors({error:[response.data.message]});
                    }
                }
                else{
                    setErrors({error:['Something went wrong!']});
                }
               
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors && (
                        <div className="alert">
                            {Object.entries(errors).map(([key, messages]) => (
                                <p key={key}>{messages[0]}</p>
                            ))}
                        </div>
                    )}
                     
                    <input ref={emailRef} type="email" placeholder="Email"  autoComplete="true"/>
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? &nbsp;
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
