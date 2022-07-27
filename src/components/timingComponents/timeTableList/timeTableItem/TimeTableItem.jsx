import React, {useState} from 'react';
import {EventBlock} from "../eventBlock/EventBlock";
import s from '../timetableList.module.css'

const TimeTableItem = ({hour, listRef}) => {
	const [isExistsEvent, setIsExistsEvent] = useState(true)
	return (
		<li className={s.timetable__item}>
						<span className={s.timetable__hour}>
							{hour}
						</span>
			{isExistsEvent && <EventBlock listRef={listRef}
						hour={hour}
						setIsExistsEvent={setIsExistsEvent}
			/>}
		</li>
	);
};

export {TimeTableItem};