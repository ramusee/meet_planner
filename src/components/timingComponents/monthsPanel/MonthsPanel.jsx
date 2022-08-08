import React from 'react';
import {Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const MonthsPanel = () => {
	const selectedMonths = useSelector(state => state.mainReducer.interface.selectedMonths)
	const currentMonth = useSelector(state => state.mainReducer.interface.currentMonth)
	return (
		<Stack>
			{selectedMonths.map(item => (
				<Stack direction="row" >
					<Typography variant="h4" fontWeight="500">{item.split(' ')[0]}</Typography>
					<Typography variant="body2">{item.slice(-4)}</Typography>
				</Stack>
			))}
		</Stack>
	)
};

export {MonthsPanel};