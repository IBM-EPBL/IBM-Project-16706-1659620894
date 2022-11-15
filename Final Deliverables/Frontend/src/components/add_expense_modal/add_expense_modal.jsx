import "./add_expense_modal.css";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStore from "../../state";
const AddExpenseModal = ({ handleClose, show }) => {
	const showHideClassName = show ? "modal display-block" : "modal display-none";

	const addExpense = useStore(state => state.addExpense)
	const fetchExpenditureBreakdown = useStore(state => state.fetchExpenditureBreakdown)

	const userId = useStore(state => state.userId)

	const [formData, setFormData] = useState({
		date: "",
		amount: "",
		category: "Food",
		description: "",
		expenseType: "debit",
	});

	let categories = [
		"Food",
		"Automobiles",
		"Entertainment",
		"Clothing",
		"Healthcare",
		"Others",
	];
	let expenseTypes = ["debit", "credit"];

	const [creatingExpense,setCreatingExpense] = useState(false)

	// const onCategoryChange = (e) => {
	// 	setFormData({
	// 		...formData,
	// 		'category': e.target.value,
	// 	})
	// 	console.log(formData)
	// };

	// const onExpenseTypeChange = (e) => {
	// 	setFormData({
	// 		...formData,
	// 		'expense_type': e.target.value.toLowerCase(),
	// 	})
	// 	console.log(formData)

	// };

	const updateFormData = (event) =>
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});

	const { amount, description, date } = formData;

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

	const handleSubmit =  async(event) => {
		try{
			event.preventDefault()
			setCreatingExpense(true)
			await addExpense(formData,userId,fetchExpenditureBreakdown)
			setCreatingExpense(false)
			console.log(formData)
			handleClose()
		}catch(e){
			showErrorToast("Something went wrong")
		}
	};

	return (
		<div className={showHideClassName}>
			<div className="modal-main">
				<div className="close-button-container">
					<button className="close-button" onClick={handleClose}>
						<i className="fa fa-solid fa-close" />
					</button>
				</div>

				<div className="form">
					<h1>Create Expense</h1>
					<form onSubmit={handleSubmit}>
						<h6 style={{ margin: "1em", fontWeight: "bold" }}>Date</h6>
						<input
							value={date}
							className="textfield"
							onChange={(e) => updateFormData(e)}
							type="date"
							name="date"
							required
						/>
						<h6 style={{ margin: "1em", fontWeight: "bold" }}>
							{"Amount (₹)"}
						</h6>

						<input
							value={amount}
							className="textfield"
							onChange={(e) => updateFormData(e)}
							type="number"
							name="amount"
							required
						/>

						<h6 style={{ margin: "1em", fontWeight: "bold" }}>Category</h6>
						<select className="textfield" name="category" onChange={e => updateFormData(e)}>
							{categories.map((n) => (
								<option className="dropdown-item" value={n}>
									{n}
								</option>
							))}
						</select>

						<h6 style={{ margin: "1em", fontWeight: "bold" }}>Expense Type</h6>
						<select className="textfield" name="expenseType" onChange={e => updateFormData(e)}>
							{expenseTypes.map((n) => (
								<option className="dropdown-item" value={n}>
									{n.charAt(0).toUpperCase() + n.slice(1)}
								</option>
							))}
						</select>

						<h6 style={{ margin: "1em", fontWeight: "bold" }}>Description</h6>
						<input
							value={description}
							className="textfield"
							onChange={(e) => updateFormData(e)}
							type="text"
							name="description"
							// required
						/>

						<div className="create-expense-button-container">
							<button className="create-expense-button" type="submit">{
								 creatingExpense ? "Creating" : "Create"
							}</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default AddExpenseModal;
