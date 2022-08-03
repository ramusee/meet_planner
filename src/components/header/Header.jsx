import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
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
								margin: '0 auto',
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