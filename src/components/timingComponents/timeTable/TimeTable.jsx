import React from 'react';
import {Box, Typography} from "@mui/material";
import s from "../../../pages/timing/timing.module.css";
import {DateObject} from "react-multi-date-picker";
import {TimetableList} from "../timeTableList/TimetableList";
import {useSelector} from "react-redux";

const hoursAM = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
	'5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM'];
const hoursPM = ['Noon', '1 PM', '2 PM', '3 PM', '4 PM',
	'5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
];

const TimeTable = React.memo( ({date}) => {
	const currentDate = useSelector(state => state.mainReducer.interface.currentDate)
	return (
		currentDate === date ? <Box>
			<Typography className={s.date}>
				{new DateObject(date).format("dddd MMMM D, YYYY")}
			</Typography>
			<Box className={s.timetable}>
				<TimetableList hours={hoursAM} date={date}/>
				<TimetableList hours={hoursPM} date={date}/>
			</Box>
		</Box> : null
	);
});

export {TimeTable};