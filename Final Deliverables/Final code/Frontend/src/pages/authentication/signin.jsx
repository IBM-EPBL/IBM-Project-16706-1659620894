import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';

export const Login = (props) => {
	const [inputs, setInputs] = useState({});
	const logIn = useStore((state) => state.logIn);
	const navigate = useNavigate();
	const [loggingIn, setLoggingIn] = useState(false);
	const [cookies, setCookie] = useCookies(['userId']);


	const handleInputChange = (event) => {
		event.persist();
		setInputs((inputs) => ({
			...inputs,
			[event.target.name]: event.target.value,
		}));
	};

	const showErrorToast = (text) => {
		toast.error(text, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (!/\S+@\S+\.\S+/.test(inputs.email) || inputs.password === "") {
				showErrorToast("Invalid Credentials");
				return;
			}
			setLoggingIn(true);
			await logIn(inputs,setCookie);
			console.log(cookies.userId)
			setLoggingIn(false);
			// navigate("/");
		} catch (e) {
			console.log(e)
			showErrorToast("Something went wrong");
		}
	};

	return (
		<div className="base-container" ref={props.containerRef}>
			<div className="header">Login</div>
			<ToastContainer />
			<div className="content">
				<div className="form">
					<div className="form-group">
						<label htmlFor="email">E-mail</label>
						<input
							type="text"
							name="email"
							value={inputs.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={inputs.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>
			<div className="footer">
				<button type="button" className="btn" onClick={handleSubmit}>
					{loggingIn ? "Logging In" : "Login"}
				</button>
			</div>
		</div>
	);
};
