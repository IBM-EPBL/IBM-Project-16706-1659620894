import React, { PureComponent } from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	Legend,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	PieChart,
	Pie,
	Sector,
	Cell,
} from "recharts";

const data = [
	{
		subject: "Food",
		A: 120,
		B: 110,
		fullMark: 3000,
	},
	{
		subject: "Automobiles",
		A: 98,
		B: 130,
		fullMark: 3000,
	},
	{
		subject: "Entertainment",
		A: 86,
		B: 130,
		fullMark: 3000,
	},
	{
		subject: "Clothing",
		A: 99,
		B: 100,
		fullMark: 3000,
	},
	{
		subject: "Healthcare",
		A: 85,
		B: 90,
		fullMark: 3000,
	},
	{
		subject: "Others",
		A: 65,
		B: 85,
		fullMark: 3000,
	},
];

const pieData = [
	{ name: "Group A", value: 200 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 },
	{ name: "Group E", value: 600 },
	{ name: "Group F", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default class ExpenseCharts extends PureComponent {
	static demoUrl =
		"https://codesandbox.io/s/radar-chart-specified-domain-mfl04";

	render() {
		return (
			<div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
				<ResponsiveContainer width={"99%"} height={500}>
					<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
						<PolarGrid />
						<PolarAngleAxis dataKey="subject" />
						<PolarRadiusAxis angle={30} domain={[0, 150]} />
						<Radar
							name="Food"
							dataKey="A"
							stroke="#8884d8"
							fill="#8884d8"
							fillOpacity={0.6}
						/>
						{/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
						<Legend />
					</RadarChart>
				</ResponsiveContainer>
				<div style={{ width: "100%", height: 450 }}>
					<ResponsiveContainer>
						<PieChart>
							<Pie dataKey="value" data={pieData} fill="#8884d8" label />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}
}
