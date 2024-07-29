import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const navigate = useNavigate();

	const handleSubmitLogin = async(e) => {
		e.preventDefault();
		const isLoggedIn = await actions.login(email, password);
		if(isLoggedIn){
			navigate("/private")
		}
      
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
		<div className="card" style={{ width: '25rem' }}>
		  <div className="card-body">
			<h5 className="card-title text-center">Sign In!</h5>
			<form onSubmit={handleSubmitLogin}>
			  <div className="mb-3">
				<label htmlFor="email" className="form-label">Email address</label>
				<input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
			  </div>
			  <div className="mb-3">
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			  </div>
			  <button type="submit" className="btn btn-primary w-100">Submit</button>
			  <hr className="my-3" />
			
			</form>
		  </div>
		</div>
	  </div>
    );
};


