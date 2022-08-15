import React from 'react';
import { Button, Stack, Typography} from "@mui/material";
import {Link} from 'react-router-dom';
import {Arrow, Circle} from "./ui";
import {LinkBar} from "../linkBar/LinkBar";
import {ShareButton} from "../shareButton/ShareButton";

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
								3. Find matches and schedule meeting</Typography>
						</Stack>
					</Stack>
				</Stack>
				<Stack flexGrow="1" alignItems="center">
					<LinkBar />
					<Stack spacing={2} mt="20px" width="100%" maxWidth="350px" alignItems="center">
						<Button variant="contained"
								color="success"
								component={Link}
								to="date"
								fullWidth
						>
							Fill up your slots
						</Button>
						<ShareButton/>
					</Stack>
				</Stack>
				
			</>
		);
	};
	
	export {HomeDesktop};