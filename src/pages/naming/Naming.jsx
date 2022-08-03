import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setUserName} from "../../store/slices/mainSlice";
import {upperLetter} from "../../helpers/upperLetter";


const Naming = () => {
	const [inputValue, setInputValue] = useState('');
	const userName = useSelector(state=> state.mainReducer.userName)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const onSubmit = (e) => {
		e.preventDefault();
		if (!inputValue) return;
		dispatch(setUserName(upperLetter(inputValue)))
		setInputValue('');
		navigate("/concurrences")
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
					  gap: '10px'
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
				: <Typography textAlign="center"
							  variant="body1"
				>
					{userName}, do you want to change your name?
				</Typography>}
			
				<Button component={Link}
						to="/timing"
						variant="contained"
						color="success"
				>
					Back
				</Button>
		</>
	);
};

export {Naming};