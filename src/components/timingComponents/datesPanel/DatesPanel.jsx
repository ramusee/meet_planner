import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {DateObject} from "react-multi-date-picker";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDate} from "../../../store/slices/mainSlice";

const shortNameDay = {
	Sun: 'S',
	Mon: 'M',
	Tue: 'T',
	Wed: 'W',
	Thu: 'T',
	Fri: 'F',
	Sat: 'S',
};

const DatesPanel = () => {
	const dates = useSelector(state => state.mainReducer.interface.dates);
	const dispatch = useDispatch();
	const handlerDateClick = (date) => {
		dispatch(setCurrentDate(date));
	};
	return (
		<Stack px="10px" direction="row" spacing={1}>
			{dates.map(item => (
				<Stack key={item.date} alignItems="center">
					<Typography variant="body2"
								component="span"
								fontSize="12px"
								color="gray"
					>{shortNameDay[new DateObject(item.date).weekDay.shortName]}
					</Typography>
					<Box onClick={() => handlerDateClick(item.date)}
						 sx={{
							 display: 'flex',
							 justifyContent: 'center',
							 alignItems: 'center',
							 backgroundColor: '#ffffff',
							 borderRadius: '50px',
							 height: '30px',
							 width: '30px',
							 cursor: 'pointer'
						 }}>
						<Typography variant="body2"
									component="span"
									fontWeight="600"
									fontSize="16px"
									color="black"
						>
							{new DateObject(item.date).day}
						</Typography>
					</Box>
				</Stack>
			))}

		</Stack>
	);
};

export {DatesPanel};