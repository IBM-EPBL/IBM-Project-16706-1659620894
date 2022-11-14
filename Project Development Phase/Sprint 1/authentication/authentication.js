import React from "react";
import "./authentication.css";
import { Login, Register } from "./index";
import styled from "styled-components";
import illustration from "./login_illustration.webp";

const AuthenticationContainer = styled.div`
	display: flex;
	flexdirection: row;
	width: 100%;
	height: 100vh;
`;

const LeftSideContainer = styled.div`
	width: 40%;
`;

class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogginActive: true,
		};
	}

	componentDidMount() {
		this.rightSide.classList.add("right");
	}

	changeState() {
		const { isLogginActive } = this.state;

		if (isLogginActive) {
			this.rightSide.classList.remove("right");
			this.rightSide.classList.add("left");
		} else {
			this.rightSide.classList.remove("left");
			this.rightSide.classList.add("right");
		}
		this.setState((prevState) => ({
			isLogginActive: !prevState.isLogginActive,
		}));
	}

	render() {
		const { isLogginActive } = this.state;
		const current = isLogginActive ? "Register" : "Login";
		const currentActive = isLogginActive ? "login" : "register";
		return (
			<AuthenticationContainer>
				<LeftSideContainer>
					<img
						style={{
							width: "100%",
							height: "100%",
							objectFit: "contain",
							backgroundColor: "white",
						}}
						src={illustration}
						alt=""
					/>
				</LeftSideContainer>

				<div
					style={{
						width: "60%",
						backgroundColor: "#12130f",
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<div className="App">
						<div className="login">
							<div className="container" ref={(ref) => (this.container = ref)}>
								{isLogginActive && (
									<Login containerRef={(ref) => (this.current = ref)} />
								)}
								{!isLogginActive && (
									<Register containerRef={(ref) => (this.current = ref)} />
								)}
							</div>
							<RightSide
								current={current}
								currentActive={currentActive}
								containerRef={(ref) => (this.rightSide = ref)}
								onClick={this.changeState.bind(this)}
							/>
						</div>
					</div>
				</div>
			</AuthenticationContainer>
		);
	}
}

const RightSide = (props) => {
	return (
		<div
			className="right-side"
			ref={props.containerRef}
			onClick={props.onClick}
		>
			<div className="inner-container">
				<div className="text">{props.current}</div>
			</div>
		</div>
	);
};

export default Authentication;
