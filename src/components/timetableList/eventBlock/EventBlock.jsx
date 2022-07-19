import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.css';
import {getTime} from "./helperTime";

const EventBlock = ({listRef, hour}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeStart, setTimeStart] = useState(null);
	const [timeEnd, setTimeEnd] = useState(null);

	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		resizeableEl.style.top = '0px';
		resizeableEl.style.bottom = '0px';
		
		let topEl = resizeableEl.getBoundingClientRect().top
		let bottomEl = resizeableEl.getBoundingClientRect().bottom
		setTimeStart(getTime(topEl))
		setTimeEnd(getTime(bottomEl + 1))
		
		//	Top Resize
		const onPointerMoveTopResize = (e) => {
			let dy = e.pageY - y;
			height = height - dy;
			y = e.pageY;
			let topEl = e.target.getBoundingClientRect().top
			if (e.target.getBoundingClientRect().top < listPosition.top) {
				height = height + dy;
			}
			setTimeStart(getTime(topEl))
			
			resizeableEl.style.height = `${height}px`;
		};
		const onPointerUpTopResize = (e) => {
			if (e.target.getBoundingClientRect().top < listPosition.top) {
				height = parseInt(styles.height, 10) - 10;
			}
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
			e.preventDefault()
			e.stopPropagation()
			const dy = e.pageY - y;
			height = height + dy;
			y = e.pageY;
			let bottomEl = e.target.getBoundingClientRect().bottom;
			if (bottomEl > listPosition.bottom) {
				height = height - dy;
			}
			setTimeEnd(getTime(bottomEl))
			resizeableEl.style.height = `${height}px`;
			
		};
		const onPointerUpBottomResize = (e) => {
			if (e.target.getBoundingClientRect().bottom > listPosition.bottom) {
				height = parseInt(styles.height, 10) - 10;
			}
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
		};
		
		const onPointerDownBottomResize = (e) => {
			y = e.pageY;
			const styles = window.getComputedStyle(resizeableEl);
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
	}, []);
	
	return (
		<div className="event-block">
			<div ref={ref}
				 className={!isVisibleBlock ? "resizeable" : "resizeable resizeable_visible"}
				 onPointerDown={() => setIsVisibleBlock(true)}
			>
				<div ref={refTop}
					 className="resizer resizer-t">
					<span onPointerDown={()=> false}
						  className="event-block__time">{timeStart}</span>
				</div>
				<div ref={refBottom}
					 className="resizer resizer-b">
					<span  className="event-block__time">{timeEnd}</span>
				</div>
			</div>
		</div>
	);
};

export {EventBlock};