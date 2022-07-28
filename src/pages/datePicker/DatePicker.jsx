import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Calendar} from "react-multi-date-picker";

import './datePicker.css';
import {Link} from "react-router-dom";

const weekDays = ["S", "M", "T", "W", "T", " F", " S"];

const DatePicker = () => {
	const today = Date.now();
	const [dates, setDates] = useState([today]);
	console.log(dates);
	return (
		<>
			<Typography textAlign="center"
						variant="body2"
						color="text.primary"
			>
				Choose all your available days
			</Typography>
			<Box sx={{
				m: '0 auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			}}>
				<Calendar
					multiple
					value={dates}
					onChange={setDates}
					weekDays={weekDays}
					renderButton={(direction, handleClick) => (
						<button className="calendar_arrow" onClick={handleClick}>
							{direction === "right" ? "❱" : "❰"}
						</button>)}
					mapDays={({ date, today, selectedDate, currentMonth, isSameDate,  }) => {
						let props = {};
						let isWeekend = [0, 6].includes(date.weekDay.index);
						
						props.style = {
							color: '#fff',
							width: '35px',
							height: '35px',
							backgroundColor: date.month.index === currentMonth.index ? "fff" : ""
						}
						if (isWeekend) props.style = {
							...props.style,
							color: 'gray'
						};
						if (isSameDate(date, selectedDate)) props.style = {
							...props.style,
							color: "red",
							backgroundColor: "#a5a5a5",
							fontWeight: "bold",
							border: "1px solid #777"
						}
						
						return props;
					}}
				/>
			</Box>
			<Stack direction="row"
				   width="100%"
				   justifyContent="space-between"
			>
				<Button component={Link}
						to="/"
						variant="contained"
						color="success"
				>
					Back
				</Button>
				<Button component={Link}
						to="/timing"
						variant="contained"
						color="success"
				>
					Next
				</Button>
			</Stack>
		</>
	);
};

export {DatePicker};