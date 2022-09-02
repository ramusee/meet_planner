import React from 'react';
import {IconButton, Stack, Typography} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {useDispatch, useSelector} from "react-redux";
import {selectCode} from "../../../store/slices/selectors";
import {fetchMeetingCode} from "../../../store/slices/actionCreators";

const LinkBar = () => {
	const code = useSelector(selectCode)
	const dispatch = useDispatch()
	const replaceCode = () => {
		dispatch(fetchMeetingCode())
	}
	return (
		<Stack direction="row"
			   alignItems="center"
			   justifyContent="space-between"
			   sx={{
				   padding: '0 15px',
				   backgroundColor: '#fff',
				   borderRadius: '6px',
				   width: '330px',
			   }}>
			<Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
				{`http://planing.msoft.team/${code}`}
			</Typography>
			<IconButton color="primary"
						aria-label="replace link"
						onClick={replaceCode}
			>
				<ChangeCircleIcon fontSize="large"/>
			</IconButton>
		</Stack>
	);
};

export {LinkBar};