import React from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
const Home = () => {
	
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
		}}
		>
			<Stack mt="50px" width="100%" alignItems="center" spacing={3}>
				<Stack color="text.primary">
					<Typography variant="body2">
						Collect all available slots with your team in 3 steps:
					</Typography>
					<Typography variant="body2">1. Fill up your slots</Typography>
					<Typography variant="body2">2. Share the link and collect others</Typography>
					<Typography variant="body2">3. Find matches and schedule meeting.</Typography>
				</Stack>
				<Stack spacing={2} width="100%">
					<Box sx={{
						display: 'flex',
						padding: '15px 20px',
						backgroundColor: '#09CE6999',
						justifyContent: 'center',
					}}>
						<Link to="/meet_planner">
							https://planing.msoft.team/a3djfg5
						</Link>
					</Box>
					<Button variant="contained" color="secondary">
						Generate new link
					</Button>
				</Stack>
			</Stack>
			<Stack mt="40px" spacing={2} width="100%">
				<Button variant="contained" color="success" component={Link} to="date">
					Fill up your slots
				</Button>
				<Button variant="contained" color="secondary">Share link</Button>
			</Stack>
		</Box>
	);
};

export {Home};