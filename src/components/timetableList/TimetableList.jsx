import React, {useEffect, useRef} from 'react';
import './timetableList.css';
import {TimeTableItem} from "./timeTableItem/TimeTableItem";

const TimetableList = ({hours}) => {
	useEffect(() => {
		listRef.current.onpointerdown = () => {
			return false;
		};
	}, []);
	const listRef = useRef(null);
	
	return (
		<ul ref={listRef}
			className="timetable__list">
			{hours.map(hour => (
				<TimeTableItem key={hour}
							   hour={hour}
							   listRef={listRef}
				/>
			))}
		</ul>
	);
};

export {TimetableList};