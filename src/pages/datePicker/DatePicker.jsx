import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Calendar} from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import './datePicker.css';
import {Link} from "react-router-dom";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

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
					className="bg-dark"
					weekDays={weekDays}
					renderButton={(direction, handleClick) => (
						<button className="calendar_arrow" onClick={handleClick}>
							{direction === "right" ? "❱" : "❰"}
						</button>)}
					mapDays={({date, today, isSameDate, selectedDate, currentMonth}) => {
						let props = {};
						let isWeekend = [0, 6].includes(date.weekDay.index);
						if (isWeekend) props.style = {
							...props.style,
							color: 'gray'
						};
						return props;
					}}
				/>
			</Box>
			<Stack direction="row"
				   width="100%"
				   justifyContent="space-between"
			>
				<Button component={Link}
						to="/meet_planner"
						variant="contained"
						color="success"
				>
					Back
				</Button>
				<Button component={Link}
						to="/meet_planner/timing"
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