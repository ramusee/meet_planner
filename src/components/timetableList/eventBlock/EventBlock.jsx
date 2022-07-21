import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.css';
import {getTime, getClosestCoords} from "./helpers";
import {useDispatch, useSelector} from "react-redux";
import mainReducer, {mainSlice} from "../../../store/slices/mainSlice";

const EventBlock = ({listRef, hour}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);
	const setSlots = mainSlice.actions.setSlots
	
	const {busySlots} = useSelector(state => state.mainReducer);
	const dispatch = useDispatch();
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const AmPm = hour === 'Noon' ? 'PM' : hour.slice(-2);
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		resizeableEl.style.top = '0px';
		resizeableEl.style.bottom = '0px';
		let topEl = resizeableEl.getBoundingClientRect().top;
		let bottomEl = resizeableEl.getBoundingClientRect().bottom;
		let topElInList = topEl - listPosition.top;
		let bottomElInList = bottomEl - listPosition.top;
		//	Top Resize
		const onPointerMoveTopResize = (e) => {
			let dy = e.pageY - y;
			height = height - dy;
			y = e.pageY;
			let topEl = ref.current.getBoundingClientRect().top;
			let topElInList = topEl - listPosition.top;
			if (topEl < listPosition.top) {
				height = height + dy;
			}
			setTimeStart(getTime(listPosition.height, topElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpTopResize = (e) => {
			let topEl = ref.current.getBoundingClientRect().top;
			let topElInList = topEl - listPosition.top;
			let closesCoords = getClosestCoords(listPosition.height, topElInList);
				height = parseInt(styles.height) + (topElInList - closesCoords);
			if (topEl < listPosition.top) {
				height = parseInt(styles.height) - (listPosition.top - topEl);
			}
			dispatch(setSlots({id: hour, top: topElInList, bottom: bottomElInList}))
			resizeableEl.style.height = `${height}px`;
			document.removeEventListener("pointermove", onPointerMoveTopResize);
			document.removeEventListener("pointerup", onPointerUpTopResize)
		};
		
		const onPointerDownTopResize = (e) => {
			y = e.pageY;
			const styles = window.getComputedStyle(resizeableEl);
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
			let bottomEl = ref.current.getBoundingClientRect().bottom;
			let bottomElInList = bottomEl - listPosition.top;
			if (bottomEl > listPosition.bottom) {
				height = height - dy;
			}
			// if(busySlots.)
			setTimeEnd(getTime(listPosition.height, bottomElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpBottomResize = (e) => {
			let bottomEl = ref.current.getBoundingClientRect().bottom;
			let bottomElInList = bottomEl - listPosition.top;
			let closesCoords = getClosestCoords(listPosition.height, bottomElInList);
				height = parseInt(styles.height) + (closesCoords - bottomElInList);
			if (bottomEl > listPosition.bottom) {
				height = parseInt(styles.height) - (bottomEl - listPosition.bottom);
			}
			dispatch(setSlots({id: hour, top: topElInList, bottom: bottomElInList}))
			resizeableEl.style.height = `${height}px`;
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
			document.removeEventListener("pointerup", onPointerUpBottomResize)
		};
		
		const onPointerDownBottomResize = (e) => {
			y = e.pageY;
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
	}, []);
	
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