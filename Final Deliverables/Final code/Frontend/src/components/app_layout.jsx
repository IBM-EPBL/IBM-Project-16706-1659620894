import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

const AppLayout = () => {
	return (
		<div
			style={{
				padding: "20px 0px 0px 320px",
			}}
		>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default AppLayout;
