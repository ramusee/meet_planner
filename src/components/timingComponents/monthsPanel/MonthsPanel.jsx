import React from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMonth} from "../../../store/slices/datesSlice";
import {selectCurrentMonth, selectMonths} from "../../../store/selectors";

const MonthsPanel =() => {
	const selectedMonths = useSelector(selectMonths);
	const currentMonth = useSelector(selectCurrentMonth);
	const dispatch = useDispatch();
	return (
		<Stack direction="row"
			   justifyContent="center"
			   spacing={1}
			   mb="15px"
		>
			{selectedMonths.map(item => (
				<Box key={item}
					 onClick={() => dispatch(setCurrentMonth(item))}
					 sx={{
						 display: 'flex',
						 alignItems: 'center',
						 backgroundColor: currentMonth === item ? '#ffffff' : '#000000',
						 padding: '5px 8px',
						 color: currentMonth === item ? '#000000' : '#ffffff',
						 borderRadius: '8px',
						 cursor: 'pointer',
						 transition: 'all .3 ease-out',
					 }}>
					<Stack spacing={1} direction="row" boxSizing="border-box">
						<Typography variant="subtitle1"
									component="span"
									fontWeight="500">
							{item.split(' ')[0]}
						</Typography>
						<Typography variant="subtitle1"
									component="span"
									fontWeight="300">
							{item.slice(-4)}
						</Typography>
					</Stack>
				</Box>
			))}
		</Stack>
	);
};

export {MonthsPanel};