import React, {useEffect, useRef, useState} from 'react';
import {EventBlock} from "../eventBlock/EventBlock";

const TimeTableItem = ({hour}) => {
	const [isEventBlock, setIsEventBlock] = useState(false)
	
	const listRef = useRef(null)
	
	useEffect(()=> {
		listRef.current.onpointerdown = () => {
			return false
		}
	})
	return (
		<div>
			<li ref={listRef}
				className="timetable__item"
				onClick={()=> {setIsEventBlock(true)}}
			>
						<span className="timetable__hour">
							{hour}
						</span>
				{isEventBlock && <EventBlock listRef={listRef}/>}
			</li>
		</div>
	);
};

export {TimeTableItem};