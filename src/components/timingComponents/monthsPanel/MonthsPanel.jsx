import React, {memo} from 'react';
import {Stack, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMonth} from "../../../store/slices/mainSlice";

const MonthsPanel = memo(() => {
	const selectedMonths = useSelector(state => state.mainReducer.interface.selectedMonths);
	const currentMonth = useSelector(state => state.mainReducer.interface.currentMonth);
	const dispatch = useDispatch()
	return (
		<Stack direction="row"
			   justifyContent="center"
			   spacing={1}
			   mb="15px"
		>
			{selectedMonths.map(item => (
				<Stack key={item}
					   direction="row"
					   alignItems="center"
					   spacing={1}
					   onClick={()=> dispatch(setCurrentMonth(item))}
					   sx={{
						   backgroundColor: currentMonth === item ? '#ffffff' : '#000000',
						   padding: '5px 8px',
						   color: currentMonth === item ? '#000000' : '#ffffff',
						   borderRadius: '8px',
						   cursor: 'pointer',
						   transition: 'all .3 ease-out'
				}}>
					<Typography variant={currentMonth === item ? "h6" : "body2"}
								component="span"
								fontWeight="500">
						{item.split(' ')[0]}
					</Typography>
					<Typography variant={currentMonth === item ? "h6" : "body2"}
								component="span"
								fontWeight="300">
						{item.slice(-4)}
					</Typography>
				</Stack>
			))}
		</Stack>
	);
});

export {MonthsPanel};