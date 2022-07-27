import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.module.css';
import {
	getTime,
	getClosestCoords,
	getClosestFreeSlotsBottomCoords,
	getClosestFreeSlotsTopCoords
} from "../../../../helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {deleteSlot, mainSlice} from "../../../../store/slices/mainSlice";
import s from './eventBlock.module.css';

const EventBlock = ({listRef, hour, setIsExistsEvent}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);
	const [isChange, setIsChange] = useState(false);
	
	const setSlots = mainSlice.actions.setSlots;
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const freeSlots = useSelector(state => state.mainReducer.freeSlots);
	const dispatch = useDispatch();
	const ampm = hour === 'Noon' ? 'PM' : hour.slice(-2);
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		const topEl = resizeableEl.getBoundingClientRect().top;
		const bottomEl = resizeableEl.getBoundingClientRect().bottom;
		const topElInList = topEl - listPosition.top;
		const bottomElInList = bottomEl - listPosition.top;
		let closestBorder;
		//	Top Resize
		const onPointerMoveTopResize = (e) => {
			const dy = e.pageY - y;
			height = height - dy;
			y = e.pageY;
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			if (topElInList < closestBorder) {
				height = height + dy;
			}
			if (topEl < listPosition.top) {
				height = height + dy;
			}
			setTimeStart(getTime(listPosition.height, topElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpTopResize = () => {
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = bottomEl - listPosition.top;
			let closestCoordsTop = getClosestCoords(listPosition.height, topElInList);
			const closestCoordsBottom = getClosestCoords(listPosition.height, bottomElInList);
			if (topElInList < closestBorder) {
				height = parseInt(styles.height) + (topElInList - closestBorder);
				closestCoordsTop = closestBorder;
			} else {
				height = parseInt(styles.height) + (topElInList - closestCoordsTop);
			}
			resizeableEl.style.height = `${height}px`;
			dispatch(setSlots({id: hour, top: closestCoordsTop, bottom: closestCoordsBottom}));
			document.removeEventListener("pointermove", onPointerMoveTopResize);
			document.removeEventListener("pointerup", onPointerUpTopResize);
		};
		
		const onPointerDownTopResize = (e) => {
			y = e.pageY;
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.bottom = styles.bottom;
			resizeableEl.style.top = null;
			closestBorder = getClosestFreeSlotsTopCoords(freeSlots, topElInList + 1, ampm);
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
			if (bottomElInList > closestBorder) {
				height = height - dy;
			}
			if (bottomEl > listPosition.bottom) {
				height = height - dy;
			}
			setTimeEnd(getTime(listPosition.height, bottomElInList));
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpBottomResize = () => {
			setIsChange(true);
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = bottomEl - listPosition.top;
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			const closestCoordsTop = getClosestCoords(listPosition.height, topElInList);
			let closestCoordsBottom = getClosestCoords(listPosition.height, bottomElInList);
			if (bottomElInList > closestBorder) {
				height = parseInt(styles.height) + (closestBorder - bottomElInList);
				closestCoordsBottom = closestBorder;
			} else {
				height = parseInt(styles.height) + (closestCoordsBottom - bottomElInList);
			}
			resizeableEl.style.height = `${height - 1}px`;
			dispatch(setSlots({id: hour, top: closestCoordsTop, bottom: closestCoordsBottom}));
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
			document.removeEventListener("pointerup", onPointerUpBottomResize);
		};
		
		const onPointerDownBottomResize = (e) => {
			y = e.pageY;
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = bottomEl - listPosition.top;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.top = styles.top;
			resizeableEl.style.bottom = null;
			closestBorder = getClosestFreeSlotsBottomCoords(freeSlots, bottomElInList, ampm);
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
		// eslint-disable-next-line
	}, [freeSlots]);
	
	return (
		<div className={s.event_block}>
			<div ref={ref}
				 className={!isVisibleBlock ? `${s.resizeable}` : `${s.resizeable} ${s.resizeable_visible}`}
				 onPointerDown={() => setIsVisibleBlock(true)}
			>
				<span className={s.event_block__time}>{`${timeStart} ${ampm}`}</span>
				<div ref={refTop}
					 className={!isChange ? `${s.resizer} ${s.resizer_t}`
						 : `${s.resizer} ${s.resizer_t} ${s.resizer_after_tap}`}>
				</div>
				<div ref={refBottom}
					 className={!isChange ? `${s.resizer} ${s.resizer_b}`
						 : `${s.resizer} ${s.resizer_b} ${s.resizer_after_tap}`}>
				</div>
				<span className={s.event_block__time}>{`${timeEnd} ${ampm}`}</span>
				{isVisibleBlock && <div className={s.event_block__del}
										onPointerDown={(e) => e.stopPropagation()}
										onClick={() => {
											setIsExistsEvent(false);
											dispatch(deleteSlot(hour));
										}
										}
				>&times;</div>}
			</div>
		</div>
	);
};

export {EventBlock};