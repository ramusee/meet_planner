import React from 'react';
import {AppBar, Toolbar, Typography, useMediaQuery} from "@mui/material";

const Header = () => {
	const matches = useMediaQuery('(min-width: 500px)');

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
							sx={{
								margin: !matches ? '0 auto' : 0,
								fontWeight: 600,
								lineHeight: '90%'
							}}
				>
					MEET PLANNER
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export {Header};