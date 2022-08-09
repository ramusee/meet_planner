import React from 'react';
import {EventBlock} from "../eventBlock/EventBlock";
import s from '../timetableList.module.css';
import {useMediaQuery} from "@mui/material";
import {EventBlockDesktop} from "../../../timeTableDesktop/eventblockDesktop/eventBlockDesktop";

const TimeTableItem = ({hour, listRef, date}) => {
	const matches = useMediaQuery('(min-width: 900px)');
	
	return (
		<li className={s.timetable__item}
		>
						<span className={s.timetable__hour}>
							{hour}
						</span>
			{matches ? <EventBlockDesktop listRef={listRef}
										  hour={hour}
										  date={date}/>
				:
				<EventBlock listRef={listRef}
							hour={hour}
							date={date}
				/>}
		</li>
	);
};

export {TimeTableItem};