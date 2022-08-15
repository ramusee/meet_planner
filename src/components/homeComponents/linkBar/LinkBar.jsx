import React from 'react';
import {IconButton, Stack, Typography} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useSelector} from "react-redux";

const LinkBar = () => {
	const code = useSelector(state=> state.mainReducer.code)
	const replaceCode = () => {
	}
	return (
		<Stack direction="row"
			   alignItems="center"
			   justifyContent="space-between"
			   sx={{
				   padding: '0 15px',
				   backgroundColor: '#fff',
				   borderRadius: '6px',
			   }}>
			<Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
				{`http://planing.msoft.team/${code}`}
			</Typography>
			<IconButton color="primary"
						aria-label="replace link"
						onClick={replaceCode}
			>
				<ChangeCircleIcon fontSize="large"/>
			</IconButton>
		</Stack>
	);
};

export {LinkBar};