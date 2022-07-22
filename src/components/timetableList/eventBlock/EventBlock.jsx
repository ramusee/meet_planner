import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.css';
import {getTime, getClosestCoords, getClosestFreeSlotsCoords} from "./helpers";
import {useDispatch, useSelector} from "react-redux";
import {mainSlice} from "../../../store/slices/mainSlice";

const EventBlock = ({listRef, hour}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);
	const setSlots = mainSlice.actions.setSlots;
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const freeSlots = useSelector(state => state.mainReducer.freeSlots);
	const dispatch = useDispatch();
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		// resizeableEl.style.top = '0px';
		// resizeableEl.style.bottom = '0px';
		const topEl = resizeableEl.getBoundingClientRect().top;
		const bottomEl = resizeableEl.getBoundingClientRect().bottom;
		const topElInList = topEl - listPosition.top;
		const bottomElInList = bottomEl - listPosition.top;
		
		
		//	Top Resize
		const onPointerMoveTopResize = (e) => {
			const dy = e.pageY - y;
			height = height - dy;
			y = e.pageY;
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			if (topEl < listPosition.top) {
				height = height + dy;
			}
			setTimeStart(getTime(listPosition.height, topElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpTopResize = (e) => {
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = Math.ceil(topEl - listPosition.top);
			const bottomEl = e.target.getBoundingClientRect().bottom;
			const bottomElInList = Math.ceil(bottomEl - listPosition.top);
			const closesCoords = getClosestCoords(listPosition.height, topElInList);
			height = parseInt(styles.height) + (topElInList - closesCoords);
			resizeableEl.style.height = `${height}px`;
			dispatch(setSlots({id: hour, top: topElInList, bottom: bottomElInList}));
			document.removeEventListener("pointermove", onPointerMoveTopResize);
			document.removeEventListener("pointerup", onPointerUpTopResize);
		};
		
		const onPointerDownTopResize = (e) => {
			y = e.pageY;
			const styles = window.getComputedStyle(resizeableEl)
			resizeableEl.style.bottom = styles.bottom;
			resizeableEl.style.top = null;
			document.addEventListener("pointermove", onPointerMoveTopResize);
			document.addEventListener("pointerup", onPointerUpTopResize);
		};
		
		// Bottom resize
		const onPointerMoveBottomResize = (e) => {
			const dy = e.pageY - y;
			height = height + dy;
			y = e.pageY;
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = bottomEl - listPosition.top;
			if (bottomEl > listPosition.bottom) {
				height = height - dy;
			}
			setTimeEnd(getTime(listPosition.height, bottomElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpBottomResize = (e) => {
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = Math.floor(bottomEl - listPosition.top);
			const closesCoords = getClosestCoords(listPosition.height, bottomElInList);
			const topEl = e.target.getBoundingClientRect().top;
			const topElInList = Math.ceil(topEl - listPosition.top);
			height = parseInt(styles.height) + (closesCoords - bottomElInList);
			resizeableEl.style.height = `${height}px`;
			dispatch(setSlots({id: hour, top: topElInList, bottom: bottomElInList}));
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
			document.removeEventListener("pointerup", onPointerUpBottomResize);
		};
		
		const onPointerDownBottomResize = (e) => {
			y = e.pageY;
			const styles = window.getComputedStyle(resizeableEl)
			resizeableEl.style.top = styles.top;
			resizeableEl.style.bottom = null;
			document.addEventListener("pointermove", onPointerMoveBottomResize);
			document.addEventListener("pointerup", onPointerUpBottomResize);
		};
		
		// added down listeners
		const resizerTop = refTop.current;
		const resizerBottom = refBottom.current;
		resizerTop.addEventListener("pointerdown", onPointerDownTopResize);
		resizerBottom.addEventListener("pointerdown", onPointerDownBottomResize);
		setTimeStart(getTime(listPosition.height, topElInList));
		setTimeEnd(getTime(listPosition.height, bottomElInList));
		return () => {
			resizerTop.removeEventListener("pointerdown", onPointerDownTopResize);
			resizerBottom.removeEventListener("pointerdown", onPointerDownBottomResize);
		};
	}, [freeSlots]);
	
	const AmPm = hour === 'Noon' ? 'PM' : hour.slice(-2);
	
	return (
		<div className="event-block">
			<div ref={ref}
				 className={!isVisibleBlock ? "resizeable" : "resizeable resizeable_visible"}
				 onPointerDown={() => setIsVisibleBlock(true)}
			>
				<span className="event-block__time">{`${timeStart} ${AmPm}`}</span>
				<div ref={refTop}
					 className="resizer resizer-t">
				</div>
				<div ref={refBottom}
					 className="resizer resizer-b">
				</div>
				<span className="event-block__time">{`${timeEnd} ${AmPm}`}</span>
			</div>
		</div>
	);
};

export {EventBlock};