import React, { useEffect, useState } from "react";
import "./expense_table.css";
import dayjs from "dayjs";
import Modal from "react-modal";
import useStore from "../../state";
import Loader from "../../components/loader/loader"

const ExpenseTable = () => {
	let expenseTypes = ["All Expenses", "Credit", "Debit"];
	const [expenseType, setExpenseType] = useState("All Expenses");
	const [showDeleteExpensePopup, setShowDeleteExpensePopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const allExpenses = useStore((state) => state.allExpenses);
	const creditExpenses = useStore((state) => state.creditExpenses);
	const debitExpenses = useStore((state) => state.debitExpenses);
	const [expenseTable,setExpenseTable] = useState(allExpenses)

	const fetchExpensesTable = useStore((state) => state.fetchExpensesTable);

	const userId = useStore((state) => state.userId);

	const onExpenseTypeChange = (e) => {
		setExpenseType(e.target.value);
		setExpenseTable(expenseType == "All Expenses" ? allExpenses : (expenseType == "Credit" ? creditExpenses : debitExpenses))
		fetch();
	};

	const onDeleteExpenseClick = () => {
		setShowDeleteExpensePopup(!showDeleteExpensePopup);
	};

	async function fetch() {
		if (
			expenseType == "All Expenses" &&
			Object.keys(allExpenses).length === 0
		) {
			setLoading(true);
			await fetchExpensesTable(userId, "All Expenses");
			setLoading(false);
		} else if (
			expenseType == "Credit" &&
			Object.keys(creditExpenses).length === 0
		) {
			setLoading(true);

			await fetchExpensesTable(userId, "Credit");
			setLoading(false);
		} else {
			setLoading(true);

			await fetchExpensesTable(userId, "Debit");
			setLoading(false);
		}
	}

	useEffect(() => {
		fetch();
	});

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	const buttonStyle = (color) => {
		return {
			width: "130px",
			height: "40px",
			color: "#fff",
			borderRadius: "5px",
			padding: "10px 25px",
			marginRight: "10px",
			textAlign: "center",
			background: color,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		};
	};

	return (
		<div>
			<div className="table-filter">
				<select className="filter-dropdown" onChange={onExpenseTypeChange}>
					{expenseTypes.map((n) => (
						<option className="filter-dropdown-item" value={n}>
							{n}
						</option>
					))}
				</select>
			</div>

			<Modal
				isOpen={showDeleteExpensePopup}
				onRequestClose={onDeleteExpenseClick}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<h1>Delete Expense?</h1>
				<h4 style={{ fontWeight: "200" }}>
					Are you sure you want to delete this expense? This action is
					IRREVERSIBLE
				</h4>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
						marginTop: "20px",
					}}
				>
					<button style={buttonStyle("#4aa088")} onClick={onDeleteExpenseClick}>
						Cancel
					</button>
					<button
						style={buttonStyle("linear-gradient(to right, #ff416c, #ff4b2b)")}
					>
						Delete
					</button>
				</div>
			</Modal>

			{
				loading ? <Loader/> : (
					<table className="expense-table">
				<thead>
					<tr>
						<th className="column-names">Date</th>
						<th className="column-names">Expense</th>
						<th className="column-names">Category</th>
						<th className="column-names">Notes</th>
						<th className="column-names"> </th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(expenseTable).map((e) => {
						return (
							<tr>
								<td className="table-entry">
									{dayjs("2022-05-05").format("DD MMM YY")}
								</td>
								<td className="table-entry">₹ 200</td>
								<td className="table-entry">Food</td>
								<td className="table-entry">Breakfast at Sheraton</td>
								<td>
									<div className="table-entry-actions">
										<i className="bx bx-edit" id="table-entry-icon" />
										<i
											className="bx bxs-trash"
											id="table-entry-icon"
											onClick={onDeleteExpenseClick}
											style={{ color: "#de2146" }}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
				)
			}
		</div>
	);
};

export default ExpenseTable;
