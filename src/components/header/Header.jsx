import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
	return (
			<AppBar position="static" sx={{height: '45px'}}>
			<Toolbar sx={{minHeight: '40px'}}>
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