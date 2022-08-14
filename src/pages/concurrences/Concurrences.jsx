import React, {memo, useState} from 'react';
import {Alert, Avatar, Button, Container, Snackbar, Stack, Typography, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import googleIcon from "../../images/googleIcon.png";
import {ShareButton} from "../../components/homeComponents/shareButton/ShareButton";

const Concurrences = memo(() => {
	const userName = useSelector(state => state.mainReducer.apiData.userName);
	const matches = useMediaQuery('(min-width: 990px)');
	
	return (
		<>
			<Container maxWidth="xs">
				<Typography textAlign="center"
							variant={matches ? "h4" : "body2"}
							fontWeight={matches ? "500" : "400"}
							color="text.primary"
							gutterBottom
				>
					Concurrences
				</Typography>
				<Stack direction="row"
					   justifyContent="space-between"
				>
					<Typography variant="body2"
								color="text.primary"
					>
						Full Concurrence
					</Typography>
					<Typography variant="body2"
								color="text.primary"
					>
						Timezone: PDT
					</Typography>
				</Stack>
				<Stack direction="row"
					   justifyContent="space-between"
					   mt="10px"
					   p="10px"
					   sx={{
						   border: "1px solid grey",
						   borderRadius: "10px",
					   }}
				>
					<Stack direction="row"
						   justifyContent="space-between"
						   width="100%"
					>
						<Typography color="text.primary">{userName || 'name'}</Typography>
						<Stack alignItems="center">
							<Avatar alt="google calendar icon"
									variant="rounded"
									sx={{
										width: "40px"
									}}
									src={googleIcon}/>
							<Typography color="text.primary" fontWeight="500">Schedule</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
			<Container maxWidth="xs">
				<Typography color="text.primary"
							variant="body2"
				>
					Part concurrence
				</Typography>
				<Stack direction="row"
					   justifyContent="space-between"
					   mt="10px"
					   p="10px"
					   sx={{
						   border: "1px solid grey",
						   borderRadius: "10px",
					   }}
				>
					<Stack direction="row"
						   justifyContent="space-between"
						   width="100%"
					>
						<Typography color="text.primary">{userName || 'name'}</Typography>
						<Stack alignItems="center">
							<Avatar alt="google calendar icon"
									variant="rounded"
									sx={{
										width: "40px"
									}}
									src={googleIcon}/>
							<Typography color="text.primary" fontWeight="500">Schedule</Typography>
						</Stack>
					</Stack>
				</Stack>
			</Container>
			<Stack margin="0 auto" maxWidth="400px" spacing={2} width="100%">
				<Button variant="contained" color="success" component={Link} to="/date">
					Fill up your slots
				</Button>
				<ShareButton/>
			</Stack>
		</>
	);
});

export {Concurrences};