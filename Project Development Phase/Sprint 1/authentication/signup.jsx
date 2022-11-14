import { sign } from "fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';

export const Register = (props) => {
	const [inputs, setInputs] = useState({});
	const [signingUp, setSigningUp] = useState(false);
	const navigate = useNavigate();
	const signUp = useStore((state) => state.signUp);
	const [cookies, setCookie] = useCookies(['userId']);


	const handleInputChange = (event) => {
		event.persist();
		setInputs((inputs) => ({
			...inputs,
			[event.target.name]:
				event.target.name == "monthly-limit"
					? parseInt(event.target.value)
					: event.target.value,
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
			if (
				inputs.name === "" ||
				!/\S+@\S+\.\S+/.test(inputs.email) ||
				inputs.monthlyLimit === "" ||
				inputs.password === ""
			) {
				showErrorToast("Please fill valid data");
				return;
			}
			setSigningUp(true);
			await signUp(inputs,setCookie);
			setSigningUp(false);
			navigate("/");
		} catch (e) {
			setSigningUp(false);
			showErrorToast("Something went wrong");
		}
	};

	return (
		<div className="base-container" ref={props.containerRef}>
			<div className="header">Register</div>
			<ToastContainer />
			<div className="content">
				<div className="form">
					<div className="form-group">
						<label htmlFor="username">Name</label>
						<input
							type="text"
							name="name"
							value={inputs.username}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							value={inputs.email}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							value={inputs.password}
							required
							onChange={handleInputChange}
						/>
					</div>
					<div
						className="
            form-group"
					>
						<label htmlFor="monthly-limit">Monthly Limit (₹)</label>
						<input
							type="number"
							name="monthly-limit"
							value={inputs.monthlyLimit}
							required
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>
			<div className="footer">
				<button type="button" className="btn" onClick={handleSubmit}>
					{signingUp ? "Registering" : "Register"}
				</button>
			</div>
		</div>
	);
};
