import React from 'react';
import {TimetableList} from "../../components/timingComponents/timeTableList/TimetableList";
import s from './timing.module.css';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {DatesPanel} from "../../components/timingComponents/datesPanel/DatesPanel";

const hoursAM = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM',
	'5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM'];
const hoursPM = ['Noon', '1 PM', '2 PM', '3 PM', '4 PM',
	'5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
];

const Timing = () => {

	return (<>
			<Box px="10px">
				<Typography textAlign="center"
							variant="body2"
							color="text.primary"
							mb="5px"
				>
					Choose all your available time with tap and drag
				</Typography>
				<Box className={s.settings_panel}>
					<span className="settings-panel__item">All day</span>
					<span className="settings-panel__item">Timezone: PBT</span>
				</Box>
			</Box>
			<DatesPanel/>
			<Box className={s.timetable}>
				<Typography className={s.date}> Sunday, July 12, 2022 </Typography>
				<TimetableList hours={hoursAM}/>
				<TimetableList hours={hoursPM}/>
			</Box>
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
};

export {Timing};