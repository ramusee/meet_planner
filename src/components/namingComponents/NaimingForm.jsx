import React, {useState} from 'react';
import {Box, Button, TextField, useMediaQuery} from "@mui/material";
import {setIsLoadTimeRanges, setUserName} from "../../store/slices/mainSlice";
import {upperLetter} from "../../helpers/upperLetter";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const NamingForm = () => {
	const [inputValue, setInputValue] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const matches = useMediaQuery('(min-width: 990px)');

	const onSubmit = (e) => {
		e.preventDefault();
		if(matches) dispatch(setIsLoadTimeRanges())
		if (!inputValue) return;
		dispatch(setUserName(upperLetter(inputValue)));
		setInputValue('');
		navigate("/concurrences");
	};
	const onChangeInputValue = (e) => {
		setInputValue(e.target.value);
	};
	return (
		<Box component="form"
			 noValidate
			 autoComplete="off"
			 onSubmit={onSubmit}
			 sx={{
				 display: 'flex',
				 flexDirection: matches ? 'row' : 'column',
				 alignItems: matches ? 'end' : 'center',
				 gap: '20px'
			 }}>
			<TextField label="Your Name"
					   variant="outlined"
					   color="success"
					   value={inputValue}
					   onChange={onChangeInputValue}
			/>
			<Button type="submit"
					variant="contained"
					color="success"
			>
				Save
			</Button>
		</Box>
	);
};

export {NamingForm};