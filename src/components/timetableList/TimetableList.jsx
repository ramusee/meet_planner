import React from 'react';
import './timetableList.css'
import {TimeTableItem} from "./timeTableItem/TimeTableItem";

const TimetableList = ({hours}) => {
	
	return (
		<ul className="timetable__list">
			{
				hours.map(hour=>(
					<TimeTableItem key={hour}
								   hour={hour}
					/>
				))
			}
		</ul>
	);
};

export {TimetableList};