import React from 'react';
import {Button, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import {LinkBar} from "../linkBar/LinkBar";

const HomeMobile = () => {
	
	return (<>
			<Stack mt="30px" width="100%" alignItems="center" spacing={3}>
				<Stack color="text.primary">
					<Typography textAlign="center"
								variant="body2"
								color="text.primary"
					>
						Collect all available slots with your team in 3 steps:
					</Typography>
					<Typography variant="body2">1. Fill up your slots</Typography>
					<Typography variant="body2">2. Share the link and collect others</Typography>
					<Typography variant="body2">3. Find matches and schedule meeting</Typography>
				</Stack>
			<LinkBar/>
			</Stack>
			<Stack spacing={2} width="100%">
				<Button variant="contained" color="success" component={Link} to="date">
					Fill up your slots
				</Button>
				<Button variant="contained" color="secondary">Share/Copy link</Button>
			</Stack>
		</>
	);
};

export {HomeMobile};