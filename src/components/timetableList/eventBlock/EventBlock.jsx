import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.css';
import {getTime, getClosestCoords} from "./helpers";

const EventBlock = ({listRef, hour}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);
	
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
		// console.log(listPosition);
		resizeableEl.style.top = '0px';
		resizeableEl.style.bottom = '0px';
		
		let topEl = resizeableEl.getBoundingClientRect().top;
		let bottomEl = resizeableEl.getBoundingClientRect().bottom;
		let topElInList = topEl - listPosition.top
		let bottomElInList = bottomEl - listPosition.top;
		setTimeEnd(getTime(listPosition.height, bottomElInList + 1));
		setTimeStart(getTime(listPosition.height, topElInList));

		
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
			let closesCoords = getClosestCoords(listPosition.height, topElInList)
			
			if (topEl < listPosition.top) {
				height = parseInt(styles.height) - (listPosition.top - topEl);
			}
			
			resizeableEl.style.height = `${height}px`;
			document.removeEventListener("pointermove", onPointerMoveTopResize);
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
			setTimeEnd(getTime(listPosition.height, bottomElInList));
			
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpBottomResize = (e) => {
			let bottomEl = ref.current.getBoundingClientRect().bottom;
			if (bottomEl > listPosition.bottom) {
				height = parseInt(styles.height) - (bottomEl - listPosition.bottom);
			}
			resizeableEl.style.height = `${height}px`;
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
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
		
		return () => {
			resizerTop.removeEventListener("pointerdown", onPointerDownTopResize);
			resizerBottom.removeEventListener("pointerdown", onPointerDownBottomResize);
		};
	}, [listRef]);
	
	return (
		<div className="event-block">
			<div ref={ref}
				 className={!isVisibleBlock ? "resizeable" : "resizeable resizeable_visible"}
				 onPointerDown={() => setIsVisibleBlock(true)}
			>
				<div ref={refTop}
					 className="resizer resizer-t">
					<span onPointerDown={() => false}
						  className="event-block__time">{`${timeStart} ${AmPm}`}</span>
				</div>
				<div ref={refBottom}
					 className="resizer resizer-b">
					<span className="event-block__time">{`${timeEnd} ${AmPm}`}</span>
				</div>
			</div>
		</div>
	);
};

export {EventBlock};