import React from 'react';
import {EventBlock} from "../eventBlock/EventBlock";
import s from '../timetableList.module.css'

const TimeTableItem = ({hour, listRef}) => {
	return (
		<li className={s.timetable__item}
		>
						<span className={s.timetable__hour}>
							{hour}
						</span>
			<EventBlock listRef={listRef}
						hour={hour}

			/>
		</li>
	);
};

export {TimeTableItem};