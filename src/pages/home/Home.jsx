import React, {memo, useEffect} from 'react';
import {useMediaQuery} from "@mui/material";
import {HomeDesktop} from "../../components/homeComponents/homeDesktop/HomeDesktop";
import {HomeMobile} from "../../components/homeComponents/homeMobile/HomeMobile";
import {useDispatch} from "react-redux";
import {fetchMeetingCode} from "../../store/slices/actionCreators";

const Home = memo(() => {
	const dispatch = useDispatch()
	useEffect(()=> {
		dispatch(fetchMeetingCode())
	})
	const matches = useMediaQuery('(min-width: 990px)');
	if (matches) {
		return <HomeDesktop/>;
	}
	return <HomeMobile/>;
});

export {Home};