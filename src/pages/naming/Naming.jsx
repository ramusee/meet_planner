import React from 'react';
import {Box, Button, Stack, TextField, Typography, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../../store/slices/mainSlice";
import {NamingForm} from "../../components/namingComponents/NaimingForm";

const Naming = React.memo(() => {
	const userName = useSelector(state => state.mainReducer.userName);
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width: 900px)');

	return (
		<>
			<Typography textAlign="center"
						variant={matches ? "h4" : "body2"}
						fontWeight={matches ? "500" : "400"}
						color="text.primary"
			>
				Underwrite your slots
			</Typography>
			{!userName ? <NamingForm/>
				: <Stack alignItems="center" gap="20px">
					<Typography textAlign="center"
								variant="body1"
					>
						{userName}, do you want to change your name?
					</Typography>
					<Button variant="outlined"
							color="success"
							onClick={() => dispatch(setUserName(''))}
					>
						change
					</Button>
				</Stack>
			}
			<Stack direction="row" justifyContent="space-between">
				<Button component={Link}
						to="/timing"
						variant="contained"
						color="success"
				>
					Back
				</Button>
				{userName && <Button component={Link}
									 to="/concurrences"
									 variant="contained"
									 color="success"
				>
					next
				</Button>}
			</Stack>
		</>
	)
});

export {Naming};