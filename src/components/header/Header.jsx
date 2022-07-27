import React from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
	return (
			<AppBar position="static">
			<Toolbar>
					<Typography variant="h4"
								color="inherit"
								component="p"
								sx={{margin: '0 auto',
									fontWeight: 600,
					}}
					>
						MEET PLANNER
					</Typography>
				</Toolbar>
			</AppBar>
	);
};

export {Header};