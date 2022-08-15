import React, {memo, useCallback, useState} from 'react';
import {Box, Button, Stack, Typography, useMediaQuery} from "@mui/material";
import {Calendar, DateObject} from "react-multi-date-picker";
import './datePicker.css';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setMonths, clearMonths, setCurrentDate, setCurrentMonth, setDate} from "../../store/slices/mainSlice";
import "react-multi-date-picker/styles/colors/green.css"

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function getSelectedMonths(dates) {
	const selectedMonths = []
	dates.forEach(item => {
		const month = `${new DateObject(item.date).month.name} ${new DateObject(item.date).year}`
		if (!selectedMonths.includes(month)) {
			selectedMonths.push(month)
		}
	})
	return selectedMonths
}
const DatePicker = memo((callback, deps) => {
	const [isNotValidDate, setIsNotValidDate] = useState(false);
	const dispatch = useDispatch();
	const dates = useSelector(state => state.mainReducer.interface.dates);
	const currentDate = useSelector(state => state.mainReducer.interface.currentDate);
	const navigate = useNavigate();
	const valueDates = dates.map(item => new DateObject(item.date));
	const isIncludesCurrentDate = dates.some(item => item.date === currentDate)
	const matches = useMediaQuery('(min-width: 990px)');
	
	const onChange = useCallback((date) => {
		const formatDates = date.map(item => ({date: (item.unix * 1000), coordsRanges: []}));
		dispatch(setDate(formatDates));
		if (date.length) setIsNotValidDate(false);
	}, []);
	const handlerBtnOnClick = () => {
		dispatch(clearMonths())
		if (dates.length) {
			navigate("/timing");
			const currentMonth = `${new DateObject(dates[0].date).month.name} ${new DateObject(dates[0].date).year}`
			dispatch(setCurrentMonth(currentMonth))
			dispatch(setMonths(getSelectedMonths(dates)))
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
						variant={matches ? "h5" : "body2"}
						fontWeight={matches ? "500" : "400"}
						color="text.primary"
			>
				Pick all your available days
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
							backgroundColor: date.month.index === currentMonth.index ? "#000" : "#FFF"
						};
						if (isWeekend) props.style = {
							...props.style,
							color: '#a1a1a1'
						};
						if (isSameDate(date, today)) props.style = {
							...props.style,
							color: '#09CE69',
						};
						return props;
					}}
				/>
				{isNotValidDate && <Typography color="error"
											   p="15px"
											   sx={{
												   position: 'absolute',
												   bottom: '0%',
												   left: '27%',
												   backgroundColor: '#1f1f1f',
												   borderRadius: '6px'
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
});

export {DatePicker};