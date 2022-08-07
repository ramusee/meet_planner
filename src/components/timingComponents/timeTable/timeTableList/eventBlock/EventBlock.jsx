import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.module.css';
import {
	getTime,
	getClosestCoords,
	getClosestRangesBottomCoords,
	getClosestRangesTopCoords
} from "../../../../../helpers/eventBlockHelper";
import {useDispatch, useSelector} from "react-redux";
import {deleteSlot, setCurrentDate, setRanges} from "../../../../../store/slices/mainSlice";
import s from './eventBlock.module.css';
import {useMediaQuery} from "@mui/material";

const EventBlock = React.memo( ({listRef, date, hour}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);
	const [isChange, setIsChange] = useState(false);
	const dates = useSelector(state => state.mainReducer.interface.dates);
	const currentDate = useSelector(state => state.mainReducer.interface.currentDate);
	const dispatch = useDispatch();
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	const refDelete = useRef(null);
	const ampm = hour === 'Noon' ? 'PM' : hour.slice(-2);
	let ranges = []
	const matches = useMediaQuery('(min-width: 900px)');

	dates.forEach(item => {
		if(item.date === currentDate) {
			ranges = item.ranges;
		}
	});
	
	//TODO убрать наслоение при нажатии на слот, когда полчаса уже занято другим слотом
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		const topEl = resizeableEl.getBoundingClientRect().top;
		const bottomEl = resizeableEl.getBoundingClientRect().bottom;
		let topElInList = topEl - listPosition.top;
		let bottomElInList = bottomEl - listPosition.top;
		let closestBorder;
		if (!isChange && date ===currentDate) {
			ranges.forEach(item => {
				if (item.id === hour) {
					setIsVisibleBlock(true);
					setIsChange(true);
					resizeableEl.style.top = `${item.top - topElInList}px`;
					height = (item.bottom - item.top);
					resizeableEl.style.height = `${height - 1}px`;
					topElInList = item.top;
					bottomElInList = item.bottom;
					setTimeStart(getTime(listPosition.height, topElInList));
					setTimeEnd(getTime(listPosition.height, bottomElInList));
				}
			});
		}

		const onClickDeleteBtn = () => {
			dispatch(deleteSlot({date: currentDate, id: hour}));
			setIsVisibleBlock(false);
			setIsChange(false);
			resizeableEl.style.top = '0px';
			resizeableEl.style.bottom = '0px';
			resizeableEl.style.height = `${(listPosition.height / 12) - 1}px`;
		};
		// Top Resize
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
			dispatch(setRanges({date: currentDate, id: hour, top: closestCoordsTop, bottom: closestCoordsBottom}));
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
			closestBorder = getClosestRangesTopCoords(ranges, topElInList + 1, ampm);
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
			dispatch(setRanges({date: currentDate, id: hour, top: closestCoordsTop, bottom: closestCoordsBottom}));
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
			document.removeEventListener("pointerup", onPointerUpBottomResize);
		};

		const onPointerDownBottomResize = (e) => {
			y = e.pageY;
			const bottomEl = ref.current.getBoundingClientRect().bottom;
			const bottomElInList = bottomEl - listPosition.top;
			const topEl = ref.current.getBoundingClientRect().top;
			const topElInList = topEl - listPosition.top;
			const styles = window.getComputedStyle(resizeableEl);
			// if(topElInList < closestBorder) {
			// 	resizeableEl.style.top = closestBorder - ;
			// }
			resizeableEl.style.top = styles.top;
			resizeableEl.style.bottom = null;
			closestBorder = getClosestRangesBottomCoords(ranges, bottomElInList, ampm);
			document.addEventListener("pointermove", onPointerMoveBottomResize);
			document.addEventListener("pointerup", onPointerUpBottomResize);
		};

		// added down listeners
		const resizerTop = refTop.current;
		const resizerBottom = refBottom.current;
		const deleteBtn = refDelete.current;
		resizerTop.addEventListener("pointerdown", onPointerDownTopResize);
		resizerBottom.addEventListener("pointerdown", onPointerDownBottomResize);
		deleteBtn.addEventListener("click", onClickDeleteBtn);
		setTimeStart(getTime(listPosition.height, topElInList));
		setTimeEnd(getTime(listPosition.height, bottomElInList));
		return () => {
			resizerTop.removeEventListener("pointerdown", onPointerDownTopResize);
			resizerBottom.removeEventListener("pointerdown", onPointerDownBottomResize);
			deleteBtn.removeEventListener("click", onClickDeleteBtn);
		};
		// eslint-disable-next-line
	}, [ranges]);

	return (
		<div className={s.event_block}>
			<div ref={ref}
				 className={!isVisibleBlock ? `${s.resizeable}` : `${s.resizeable} ${s.resizeable_visible}`}
				 onPointerDown={() => {
					 setIsVisibleBlock(true);
					 dispatch(setCurrentDate(date))
				 }}
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
				<button className={s.event_block__del}
						ref={refDelete}
						onPointerDown={(e) => e.stopPropagation()}
						disabled={!isVisibleBlock}
				>×
				</button>
			</div>
		</div>
	);
});

export {EventBlock};