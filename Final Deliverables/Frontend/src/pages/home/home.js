import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import ExpenditureBreakdown from "../../components/expenditure_breakdown/expenditure_breakdown";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "../../components/add_expense_modal/add_expense_modal";
import ExpenseCharts from "../../components/expense_charts/expense_charts";
import { useCookies } from 'react-cookie';

const Home = () => {
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);
	const [cookies,setCookie] = useCookies(['userId'])

	const onFabClick = () => {
		setShowPopup(!showPopup);
	};
	return (
		<div className="main-container">
			<div className="main-area">
				<h3 className="hello-text">Expenditure Insights</h3>
				<ExpenditureBreakdown />
				{/* <h1 className='hello-text'>Most Recent Expenses</h1> */}
				{/* <ExpenditureTable/> */}
				{/* <h1 className='hello-text'>Expenditure Insights</h1> */}

				<ExpenseCharts />
				{showPopup ? (
					<AddExpenseModal
						show={showPopup}
						handleClose={onFabClick}
					></AddExpenseModal>
				) : null}
				<button className="float" onClick={onFabClick}>
					<i class="fa fa-solid fa-plus"></i>
				</button>
			</div>
		</div>
	);
};

export default Home;
