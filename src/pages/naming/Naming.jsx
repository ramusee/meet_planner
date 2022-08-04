import React, {useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../../store/slices/mainSlice";
import {upperLetter} from "../../helpers/upperLetter";
import {DateObject} from "react-multi-date-picker";

function convertDateToUTC(date) {
	return new Date(date.getUTCFullYear(), date.getUTCMonth(),
		date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(),
		date.getUTCSeconds());
}

const Naming = React.memo(() => {
	const [inputValue, setInputValue] = useState('');
	const userName = useSelector(state => state.mainReducer.userName);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		if (!inputValue) return;
		dispatch(setUserName(upperLetter(inputValue)));
		setInputValue('');
		navigate("/concurrences");
	};
	const onChangeInputValue = (e) => {
		setInputValue(e.target.value);
	};
	return (
		<>
			<Typography textAlign="center"
						variant="body2"
						color="text.primary"
			>
				Underwrite your slots
			</Typography>
			{!userName ? <Box component="form"
							  noValidate
							  autoComplete="off"
							  onSubmit={onSubmit}
							  sx={{
								  display: 'flex',
								  flexDirection: 'column',
								  alignItems: 'center',
								  gap: '20px'
							  }}>
					<TextField label="Your Name"
							   variant="outlined"
							   color="success"
							   value={inputValue}
							   onChange={onChangeInputValue}
					/>
					<Button type="submit"
							variant="outlined"
							color="success"
					>
						Save
					</Button>
				</Box>
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