import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore from "../../state";
import { useCookies } from 'react-cookie';
import "./sidebar.css";

const sidebarNavItems = [
	{
		display: "Dashboard",
		icon: <i className="bx bx-home"></i>,
		to: "/",
		section: "",
	},
	{
		display: "Stats",
		icon: <i className="bx bx-stats"></i>,
		to: "/stats",
		section: "stats",
	},
	{
		display: "Profile",
		icon: <i className="bx bx-user"></i>,
		to: "/profile",
		section: "profile",
	},
];

const Sidebar = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [stepHeight, setStepHeight] = useState(0);
	const sidebarRef = useRef();
	const indicatorRef = useRef();
	const location = useLocation();
	const navigate  = useNavigate()
	const [cookies,setCookie] = useCookies(['userId'])

	const logOut = useStore((state) => state.logout);

	const onSignOut = () => {
		logOut(setCookie)
		navigate("/")
	}

	useEffect(() => {
		setTimeout(() => {
			const sidebarItem = sidebarRef.current.querySelector(
				".sidebar__menu__item"
			);
			indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
			setStepHeight(sidebarItem.clientHeight);
		}, 50);
	}, []);

	// change active index
	useEffect(() => {
		const curPath = window.location.pathname.split("/")[1];
		const activeItem = sidebarNavItems.findIndex(
			(item) => item.section === curPath
		);
		setActiveIndex(curPath.length === 0 ? 0 : activeItem);
	}, [location]);

	return (
		<div className="sidebar">
			<div className="sidebar__logo">
				{/* {cookies.userId} */}
				</div>
			<div ref={sidebarRef} className="sidebar__menu">
				<div
					ref={indicatorRef}
					className="sidebar__menu__indicator"
					style={{
						transform: `translateX(-50%) translateY(${
							activeIndex * stepHeight
						}px)`,
					}}
				></div>
				{sidebarNavItems.map((item, index) => (
					<Link to={item.to} key={index}>
						<div
							className={`sidebar__menu__item ${
								activeIndex === index ? "active" : ""
							}`}
						>
							<div className="sidebar__menu__item__icon">{item.icon}</div>
							<div className="sidebar__menu__item__text">{item.display}</div>
						</div>
					</Link>
				))}
			</div>
			<div className="sign-out-button-container" onClick={onSignOut}>
				<i
					style={{ fontSize: "1.75rem", marginRight: "8px" }}
					class="bx bxs-log-out"
				></i>{" "}
				Sign Out{" "}
			</div>
		</div>
	);
};

export default Sidebar;
