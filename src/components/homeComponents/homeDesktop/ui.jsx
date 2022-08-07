import {Box, Icon} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import React from "react";

export const Arrow = () => {
	return (
		<Icon sx={{
			width: '80px',
			height: '80px'
		}}>
			<DoubleArrowIcon sx={{fontSize: '80px'}}/>
		</Icon>
	);
};
export const Circle = ({number}) => {
	return (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '80px',
			height: '80px',
			borderRadius: '50px',
			backgroundColor: '#09CE69',
			color: '#000000',
		}}>{number}</Box>);
};