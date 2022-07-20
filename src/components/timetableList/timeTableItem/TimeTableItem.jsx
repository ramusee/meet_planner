import React from 'react';
import {EventBlock} from "../eventBlock/EventBlock";


const TimeTableItem = ({hour, listRef}) => {
	return (
		<li className="timetable__item">
						<span className="timetable__hour">
							{hour}
						</span>
			<EventBlock listRef={listRef}
						hour={hour}
			/>
		</li>
	);
};

export {TimeTableItem};