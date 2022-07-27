import React from 'react';
import {Box, Button, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';

const Home = () => {
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			height: '100%'
		}}
		>
			<Stack mt="50px" spacing={3}>
				<Stack>
					<Typography variant="body2"
								color="secondary"
					>
						Collect all available slots with your team in 3 steps:
					</Typography>
					<List >
						<ListItem>
							<ListItemText color="secondary">1. Fill up your slots</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>2. Share the link and collect others</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>3. Find matches and schedule meeting.</ListItemText>
						</ListItem>
					</List>
				</Stack>
				<Stack spacing={2} width="100%">
					<Box sx={{
						padding: '15px 20px',
						backgroundColor: '#09CE6999',
						justifyContent: 'center',
					}}>
						<Link to="/">
							https://planing.msoft.team/a3djfg5
						</Link>
					</Box>
				</Stack>
			</Stack>
			<Stack spacing={2} width="100%">
			</Stack>
		</Box>
	);
};

export {Home};