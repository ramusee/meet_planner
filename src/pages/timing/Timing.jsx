import React from 'react';
import s from './timing.module.css';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {DatesPanel} from "../../components/timingComponents/datesPanel/DatesPanel";
import {useSelector} from "react-redux";
import {TimeTable} from "../../components/timingComponents/timeTable/TimeTable";



const Timing = React.memo(() => {
	const {dates} = useSelector(state => state.mainReducer.interface);
	return (<>
			<Box px="10px">
				<span className={s.title}
				>
					Choose all your available time with tap and drag
				</span>
				<Box className={s.settings_panel}>
					<span>All day</span>
					<span>Timezone: PBT</span>
				</Box>
			</Box>
			<DatesPanel/>
			{dates.map(item => (
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
			>
				<Button component={Link}
						to="/date"
						variant="contained"
						color="success"
				>
					Back
				</Button>
				<Button component={Link}
						to="/naming"
						variant="contained"
						color="success"
				>
					Next
				</Button>
			</Stack>
		</>
	);
});

export {Timing};