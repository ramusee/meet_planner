import React from 'react';
import {Button, IconButton, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import {Arrow, Circle} from "./ui";

const HomeDesktop = () => {
	return (<>
			<Stack my="40px" width="100%" alignItems="center" spacing={3}>
				<Typography textAlign="center"
							color="text.primary"
							variant="h5"
							fontWeight="500"
				>
					Collect all available slots with your team in 3 steps:
				</Typography>
				<Stack color="text.primary" sx={{
					flexDirection: 'row',
					fontSize: '24px',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: '25px'
				}}>
					<Stack spacing={2} alignItems="center" height="170px" width="250px">
						<Circle number={1}/>
						<Typography variant="inherit" textAlign="center">
							1. Fill up your slots</Typography>
					</Stack>
					<Arrow/>
					<Stack spacing={2} alignItems="center" height="170px" width="250px">
						<Circle number={2}/>
						<Typography variant="inherit" textAlign="center">
							2. Share the link and collect others</Typography>
					</Stack>
					<Arrow/>
					<Stack spacing={2} alignItems="center" height="170px" width="250px">
						<Circle number={3}/>
						<Typography variant="inherit" textAlign="center">
							3. Find matches and schedule meeting.</Typography>
					</Stack>
				</Stack>
			</Stack>
			<Stack flexGrow="1" alignItems="center">
				<Stack direction="row"
					   alignItems="center"
					   justifyContent="space-between"
					   sx={{
						   padding: '0 15px',
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
				<Stack spacing={2} mt="20px" width="100%" maxWidth="350px" alignItems="center">
					<Button variant="contained"
							color="success"
							component={Link}
							to="date"
							fullWidth
					>
						Fill up your slots
					</Button>
					<Button variant="contained"
							color="secondary"
							fullWidth
					>Share/Copy link</Button>
				</Stack>
			</Stack>
		</>
	);
};

export {HomeDesktop};