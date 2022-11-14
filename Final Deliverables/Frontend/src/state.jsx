import create from "zustand";

const url = "https://p-e-t.herokuapp.com";

const useStore = create((set) => ({
	userId: "",
	setUserId: (id) => set((state) => ({ userId: id })),
	expenditureBreakdown: {},
	fetchingBreakdown: false,
	addExpense: async (data, userId, fetchExpenditureBreakdown) => {
		var myHeaders = new Headers();
		myHeaders.append("user_id", userId);
		var formdata = new FormData();
		let categories = {
			Food: 1,
			Automobiles: 2,
			Entertainment: 3,
			Clothing: 4,
			Healthcare: 5,
			Others: 6,
		};
		formdata.append("date", data.date + " 00:00:00");
		formdata.append("amount", data.amount);
		formdata.append("category_id", categories[data["category"]]);
		formdata.append("description", data.description);
		formdata.append("expense_type", data["expenseType"]);
		for (var pair of formdata.entries()) {
			console.log(pair[0] + ", " + pair[1]);
		}
		const response = await fetch(url + "/add", {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		});
		if (response.status == 200) {
			const json = await response.json();
			console.log(json);
			await fetchExpenditureBreakdown(false, userId);
		}
	},
	fetchExpenditureBreakdown: async (fetchingBreakdown, userId) => {
		if (!fetchingBreakdown) {
			set((_) => ({ fetchingBreakdown: true }));
			var myHeaders = new Headers();
			myHeaders.append("user_id", userId);
			const response = await fetch(url + "/expenditure-breakdown", {
				method: "GET",
				headers: myHeaders,
				redirect: "follow",
			});
			if (response.status === 200) {
				const json = await response.json();
				console.log("breakdown");
				console.log({
					totalSpent:
						json["total"] === null || json["total"] === undefined
							? 0
							: json["total"],
					today:
						json["today"] === null || json["today"] === undefined
							? 0
							: json["today"],
					thisWeek:
						json["week"] === null || json["week"] === undefined
							? 0
							: json["week"],
					thisMonth:
						json["month"] === null || json["month"] === undefined
							? 0
							: json["month"],
					thisYear:
						json["year"] === null || json["year"] === undefined
							? 0
							: json["year"],
					mostSpentOn:
						json["most_spent_on"] === null ||
						json["most_spent_on"] === undefined
							? "-"
							: json["most_spent_on"],
					mostSpentDay:
						json["most_spent_day"] === null ||
						json["most_spent_day"] === undefined
							? "-"
							: json["most_spent_day"],
					leastSpentDay:
						json["least_spent_day"] === null ||
						json["least_spent_day"] === undefined
							? "-"
							: json["least_spent_day"],
				});
				set((_) => ({
					expenditureBreakdown: {
						totalSpent: json["total"],
						today: json["today"],
						thisWeek: json["week"],
						thisMonth: json["month"],
						thisYear: json["year"],
						mostSpentOn: json["most_spent_on"],
						mostSpentDay: json["most_spent_day"],
						leastSpentDay: json["least_spent_day"],
					},
				}));
			}
			set((_) => ({ fetchingBreakdown: false }));
		}
	},
	logIn: async (data, setCookie) => {
		try {
			var formdata = new FormData();
			formdata.append("email", data.email);
			formdata.append("password", data.password);
			const response = await fetch(url + "/login", {
				method: "POST",
				body: formdata,
				redirect: "follow",
			});
			if (response.status === 200) {
				const json = await response.json();

				console.log("user id " + json["user_id"]);
				set((_) => ({
					userId: json["user_id"],
				}));
				setCookie("userId", json["user_id"]);
				console.log("COOKIE SET");
			}
		} catch (e) {
			console.log(e);
		}
	},
	signUp: async (data, setCookie) => {
		try {
			var formdata = new FormData();
			formdata.append("name", data.name);
			formdata.append("email", data.email);
			formdata.append("password", data.password);
			formdata.append("monthly_limit", data["monthly-limit"]);

			var requestOptions = {
				method: "POST",
				body: formdata,
				redirect: "follow",
			};

			const response = await fetch(url + "/register", requestOptions);
			if (response.status === 200) {
				const json = await response.json();
				set((_) => ({ userId: json["user_id"] }));
				setCookie("userId", json["user_id"]);
			}
		} catch (e) {
			console.log(e);
		}
	},
	logout: (setCookie) => {
		setCookie("userId", "");
		set((_) => ({ userId: "" }));
	},
	allExpenses: {},
	creditExpenses: {},
	debitExpenses: {},
	fetchExpensesTable: async (userId, type) => {
		var myHeaders = new Headers();
		myHeaders.append("user_id", userId);

		var requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		const response = fetch(
			url +
				`/expenses${
					type == "All Expenses"
						? ""
						: `${type == "Credit" ? "credit" : "debit"}`
				}`,
			requestOptions
		);
		if (response.status == 200) {
			const json = await response.json();
			console.log(json)
			switch (type) {
				case "All Expenses":
					set((_) => ({
						allExpenses: json,
					}));
					break;
				case "Credit":
					set((_) => ({
						creditExpenses: json,
					}));
					break;
				default:
					set((_) => ({
						debitExpenses: json,
					}));
					break;
			}
		}
	},
}));
export default useStore;
