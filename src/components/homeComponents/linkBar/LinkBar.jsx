import React, {useEffect} from 'react';
import {Box, CircularProgress, IconButton, Stack, Typography} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {useDispatch, useSelector} from "react-redux";
import {selectCode, selectError, selectIsLoading} from "../../../store/selectors";
import {fetchMeetingCode} from "../../../store/actionCreators";


const LinkBar = () => {
	useEffect(() => {
		if (!code) {
			dispatch(fetchMeetingCode());
		}
	}, []);
	
	const dispatch = useDispatch();
	const code = useSelector(selectCode);
	const error = useSelector(selectError);
	const isLoading = useSelector(selectIsLoading);
	const link = `http://planing.msoft.team/${code}`;
	
	const replaceCode = () => {
		dispatch(fetchMeetingCode());
	};
	
	return (
		<Stack direction="row"
			   alignItems="center"
			   justifyContent="space-between"
			   sx={{
				   padding: '0 0 0 15px',
				   backgroundColor: '#fff',
				   borderRadius: '6px',
				   width: '360px',
			   }}>
			{error && <Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
				{error}
			</Typography>}
			{!error &&
				<Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
					{link}
				</Typography>}
			{isLoading &&
				// 	<Typography mr="10px" variant="body1" color="primary" component="span" textAlign="center">
				// 	{'link is generated...'}
				// </Typography>
				<Box sx={{
					display: 'flex',
				}}>
					<CircularProgress size={20}/>
				</Box>
			}
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