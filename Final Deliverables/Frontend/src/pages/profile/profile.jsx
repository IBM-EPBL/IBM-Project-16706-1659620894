import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./profile.css";
import avatar from "./avatar.png";
export default function Profile() {
	const [monthlyLimit, setMonthlyLimit] = useState(2000);

	const updateFormData = (event) => setMonthlyLimit(event.target.value);
	return (
		<div className="profile-container">
			<img src={avatar} />
			<div style={{ width: "25%", marginTop: "30px" }} class="container">
				<div class="row">
					<div class="col-sm">Name</div>
					<div class="col-sm" style={{ fontWeight: "bold" }}>
						Raajeev Chandran
					</div>
				</div>
			</div>

			<div
				style={{ width: "25%", marginTop: "30px", marginBottom: "20px" }}
				class="container"
			>
				<div class="row">
					<div class="col-sm">Email</div>
					<div class="col-sm" style={{ fontWeight: "bold" }}>
						rajeevchandran618@gmail.com
					</div>
				</div>
			</div>

			<h6 style={{ margin: "1em", fontWeight: "bold" }}>
				Current Monthly Limit
			</h6>
			<input
				value={monthlyLimit}
				className="monthly-limit-textfield"
				onChange={(e) => updateFormData(e)}
				type="number"
				name="monthlyLimit"
				required
			/>
		</div>
	);
}
