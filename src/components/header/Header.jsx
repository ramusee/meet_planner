import React from 'react';
import {AppBar, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Header = () => {
	const matches = useMediaQuery('(min-width: 990px)');
	const navigate = useNavigate()
	const handleOnClick = ()=> {
		navigate('/')
	}
	return (
		<AppBar position="static"
				sx={{
					backgroundColor: 'black',
					minHeight: '36px'
				}}
		>
			<Toolbar
				variant="dense"
				sx={{
					backgroundColor: 'black'
			}}>
				<Typography variant="h4"
							color="inherit"
							component="p"
							onClick={handleOnClick}
							sx={{
								margin: !matches ? '0 auto' : 0,
								fontWeight: 600,
								lineHeight: '90%',
								cursor: 'pointer'
							}}
				>
					MEET PLANNER
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export {Header};