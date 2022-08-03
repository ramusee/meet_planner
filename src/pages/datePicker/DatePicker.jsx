import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Calendar, DateObject} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css";
import './datePicker.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDate, setDate} from "../../store/slices/mainSlice";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

const DatePicker = () => {
	const [isNotValidDate, setIsNotValidDate] = useState(false);
	const dispatch = useDispatch();
	const dates = useSelector(state => state.mainReducer.interface.dates);
	const currentDate = useSelector(state => state.mainReducer.interface.currentDate);
	const navigate = useNavigate();
	const valueDates = dates.map(item => new DateObject(item.date));
	const isIncludesCurrentDate = dates.some(item => item.date === currentDate)

	const onChange = (date) => {
		const formatDates = date.map(item => ({date: (item.unix * 1000), ranges: []}));
		dispatch(setDate(formatDates));
		if (date.length) setIsNotValidDate(false);
	};
	
	const handlerBtnOnClick = () => {
		if (dates.length) {
			navigate("/timing");
			if(!currentDate || !isIncludesCurrentDate) {
				dispatch(setCurrentDate(dates[0].date));
			}
		} else {
			setIsNotValidDate(true);
		}
	};
	return (
		<>
			<Typography textAlign="center"
						variant="body2"
						color="text.primary"
			>
				Choose all your available days
			</Typography>
			<Box sx={{
				margin: '0 auto',
				position: 'relative'
			}}>
				<Calendar
					multiple
					sort
					value={valueDates}
					onChange={onChange}
					weekDays={weekDays}
					className="green"
					renderButton={(direction, handleClick) => (
						<button className="calendar_arrow" onClick={handleClick}>
							{direction === "right" ? "❱" : "❰"}
						</button>)}
					mapDays={({date, today, selectedDate, currentMonth, isSameDate}) => {
						let props = {};
						let isWeekend = [0, 6].includes(date.weekDay.index);
						
						props.style = {
							color: '#fff',
							width: '35px',
							height: '35px',
							fontSize: '18px',
						};
						if (isWeekend) props.style = {
							...props.style,
							color: '#a1a1a1'
						};
						if (isSameDate(date, today)) props.style = {
							...props.style,
							color: '#ffffff',
						};
						return props;
					}}
				/>
				{isNotValidDate && <Typography color="error"
											   p="15px"
											   sx={{
												   position: 'absolute',
												   bottom: '10%',
												   left: '27%',
												   backgroundColor: "#1f1f1f",
												   borderRadius: "6px"
											   }}
				>
					Please, select dates
				</Typography>}
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
				<Button onClick={handlerBtnOnClick}
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