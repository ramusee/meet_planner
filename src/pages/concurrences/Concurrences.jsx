import React from 'react';
import {Avatar, Box, Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import googleIcon from "../../images/googleIcon.png";

const Concurrences = () => {
	const userName = useSelector(state => state.mainReducer.userName);
	return (
		<>
			<Box>
				<Typography textAlign="center"
							variant="body2"
							color="text.primary"
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
			</Box>
			<Box>
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
			</Box>
			<Stack spacing={2} width="100%">
				<Button variant="contained" color="success" component={Link} to="/date">
					Fill up your slots
				</Button>
				<Button variant="contained" color="secondary">Share link</Button>
			</Stack>
		</>
	);
};

export {Concurrences};