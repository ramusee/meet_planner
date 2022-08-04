import React from 'react';
import {Box, Button, Icon, Stack, Typography, useMediaQuery} from "@mui/material";
import {Link} from 'react-router-dom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


const Arrow = () => {
	const matches = useMediaQuery('(min-width: 600px)');
	
	return (
			matches && <Icon sx={{
				width: '80px',
				height: '80px'
			}}>
				<DoubleArrowIcon sx={{fontSize: '80px'}}/>
			</Icon>
	)
}

const Home = () => {
	const matches = useMediaQuery('(min-width: 600px)');
	
	return (<>
			<Stack mt="30px" width="100%" alignItems="center" spacing={3}>
				<Stack color="text.primary" sx={{
					flexDirection: matches ? 'row' : 'column'
				}}>
					<Typography textAlign="center"
								variant="body2"
								color="text.primary"
					>
						Collect all available slots with your team in 3 steps:
					</Typography>
					<Typography variant="body2">1. Fill up your slots</Typography>
					<Arrow/>
					<Typography variant="body2">2. Share the link and collect others</Typography>
					<Arrow/>
					<Typography variant="body2">3. Find matches and schedule meeting.</Typography>
				</Stack>
				<Stack spacing={2} width="100%">
					<Box sx={{
						display: 'flex',
						padding: '15px 20px',
						backgroundColor: '#09CE6999',
						justifyContent: 'center',
					}}>
						<Link to="/">
							https://planing.msoft.team/a3djfg5
						</Link>
					</Box>
					<Button variant="contained" color="secondary">
						Generate new link
					</Button>
				</Stack>
			</Stack>
			<Stack spacing={2} width="100%">
				<Button variant="contained" color="success" component={Link} to="date">
					Fill up your slots
				</Button>
				<Button variant="contained" color="secondary">Share link</Button>
			</Stack>
		</>
	);
};

export {Home};