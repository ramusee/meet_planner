import React from 'react';
import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

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
					<Typography variant="body2">3. Find matches and schedule meeting.</Typography>
				</Stack>
				<Stack direction="row"
					   alignItems="center"
					   justifyContent="space-between"
					   sx={{
						   padding: '8px 15px',
						   backgroundColor: '#fff',
						   borderRadius: '6px',
					   }}>
					<Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
						https://planing.msoft.team/a3djfg5
					</Typography>
					<IconButton color="primary" aria-label="replace link">
						<ChangeCircleIcon fontSize="large"/>
					</IconButton>
				</Stack>
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