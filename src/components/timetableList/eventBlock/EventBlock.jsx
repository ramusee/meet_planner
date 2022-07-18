import React, {useEffect, useRef, useState} from 'react';
import './eventBlock.css';
import {times} from './helperTime';

const EventBlock = ({listRef}) => {
	const [isVisibleBlock, setIsVisibleBlock] = useState(false);
	const [timeTop, setTimeTop] = useState(null);
	const [timeBottom, setTimeBottom] = useState(null);
	
	// const
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let yCord = 0;
		const listPosition = listRef.current.getBoundingClientRect();
		resizeableEl.style.top = '0px';
		resizeableEl.style.bottom = '0px';
		resizeableEl.ondragstart = () => false;
		let eventBlockTop = resizeableEl.getBoundingClientRect().top
		let eventBlockBottom = resizeableEl.getBoundingClientRect().bottom
		
		if (times.has(Math.round(eventBlockTop))) {
			setTimeTop(times.get(Math.round(eventBlockTop)));
		}
		if (times.has(Math.round(eventBlockBottom)+1)) {
			setTimeBottom(times.get(Math.round(eventBlockBottom)+1));
		}
		
		//	Top Resize
		const onPointerDownTopResize = (e) => {
			e.preventDefault();
			yCord = e.clientY;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.bottom = styles.bottom;
			resizeableEl.style.top = null;
			document.addEventListener("pointermove", onPointerMoveTopResize);
			document.addEventListener("pointerup", onPointerUpTopResize);
		};
		const onPointerMoveTopResize = (e) => {
			let dy = e.clientY - yCord;
			height = height - dy;
			yCord = e.clientY;
			let topEl = e.target.getBoundingClientRect().top
			
			if (topEl < listPosition.top) {
				height = height + dy;
			}
			if (times.has(Math.round(topEl))) {
				setTimeTop(times.get(Math.round(topEl)));
			}
			resizeableEl.style.height = `${height}px`;
		};
		const onPointerUpTopResize = (e) => {
			if (e.target.getBoundingClientRect().top < listPosition.top) {
				height = parseInt(styles.height, 10) - 10;
			}
			document.removeEventListener("pointermove", onPointerMoveTopResize);
		};
		
		// Bottom resize
		const onPointerDownBottomResize = (e) => {
			e.preventDefault();
			yCord = e.clientY;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.top = styles.top;
			resizeableEl.style.bottom = null;
			document.addEventListener("pointermove", onPointerMoveBottomResize);
			document.addEventListener("pointerup", onPointerUpBottomResize);
		};
		
		const onPointerMoveBottomResize = (e) => {
			const dy = e.clientY - yCord;
			height = height + dy;
			yCord = e.clientY;
			let bottomEl = e.target.getBoundingClientRect().bottom;
			
			if (bottomEl > listPosition.bottom) {
				height = height - dy;
			}
			if (times.has(Math.round(bottomEl))) {
				setTimeBottom(times.get(Math.round(bottomEl)));
			}
			resizeableEl.style.height = `${Math.round(height)}px`;
			
		};
		const onPointerUpBottomResize = (e) => {
			if (e.target.getBoundingClientRect().bottom > listPosition.bottom) {
				height = parseInt(styles.height, 10) - 10;
			}
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
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
				<div ref={refTop} className="resizer resizer-t">
					<span onPointerDown={()=> false}
						  className="event-block__time">{timeTop}</span>
				</div>
				<div ref={refBottom} className="resizer resizer-b">
					<span  className="event-block__time">{timeBottom}</span>
				</div>
			</div>
		</div>
	);
};

export {EventBlock};