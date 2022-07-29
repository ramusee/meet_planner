import React, {useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Calendar, DateObject} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css"
import './datePicker.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setDate} from "../../store/slices/mainSlice";

const weekDays = ["S", "M", "T", "W", "T", " F", " S"];
const format = "DD/MM/YYYY"

const DatePicker = () => {
	const [dates, setDates] = useState([Date.now()])
	const [isNotValidDate, setIsNotValidDate] = useState(false)
	const dispatch = useDispatch()
	const globalDates = useSelector(state => state.mainReducer.dates)
	const navigate = useNavigate()
	
	const onChange = (date) => {
		setDates(date)
		// dispatch(setDates)
	}
	console.log(dates);
	const handlerBtnOnClick = (e) => {
		if(dates.length) {
			navigate("/timing")
		} else {
			setIsNotValidDate(true)
		}
	}
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
					format={format}
					value={dates}
					onChange={onChange}
					weekDays={weekDays}
					className="green"
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
						
						return props;
					}}
				/>
				{isNotValidDate && <Typography color="error"
											   sx={{
												   position: 'absolute',
												   bottom: '10%',
												   left: '32%'
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