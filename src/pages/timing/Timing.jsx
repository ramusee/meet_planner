import React from 'react';
import s from './timing.module.css';
import {Box, Button, Stack, Typography, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
import {DatesPanel} from "../../components/timingComponents/datesPanel/DatesPanel";
import {useSelector} from "react-redux";
import {TimeTable} from "../../components/timingComponents/timeTable/TimeTable";
import {NamingForm} from "../../components/namingComponents/NaimingForm";
import {TimetableDesktop} from "../../components/timingComponents/timeTableDesktop/TimetableDesktop";


const Timing = React.memo(() => {
	const matches = useMediaQuery('(min-width: 900px)');
	const {dates} = useSelector(state => state.mainReducer.interface);
	return (<>
			<Box px="10px">
				<Typography color="text.primary"
							textAlign="center"
							variant={matches ? "h4" : "body2"}
							fontWeight={matches ? "500" : "400"}
				>
					Give your available time with tap and drag
				</Typography>
				<Box className={s.settings_panel}>
					<span>All day</span>
					<span>Timezone: PBT</span>
				</Box>
			</Box>
			{!matches && <DatesPanel/>}

			{// {matches ? <Stack direction="row">{
			// 	dates.map(item => (
			// 		<TimetableDesktop key={item.date} date={item.date}/>
			// 	))}
			// 	</Stack>
			// 	:
				dates.map(item => (
					<TimeTable key={item.date} date={item.date}/>
				))}
			{!dates.length && <Typography textAlign="center"
										  variant="body1"
										  mb="150px"
										  color="text.primary"
										  p="15px"
										  sx={{
											  backgroundColor: "#1f1f1f",
											  borderRadius: "6px"
										  }}
			>
				Select the dates in the previous step
			</Typography>}
			<Stack direction="row"
				   width="100%"
				   justifyContent="space-between"
				   alignItems="center"
			>
				<Button component={Link}
						to="/date"
						variant="contained"
						color="success"
				>
					Back
				</Button>
				{matches ? <NamingForm/> : <Button component={Link}
												   to="/naming"
												   variant="contained"
												   color="success"
				>
					Next
				</Button>}

			</Stack>
		</>
	);
});

export {Timing};