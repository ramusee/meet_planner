import React, {useEffect, useRef} from 'react';
import './eventBlock.css';


const EventBlock = () => {
	const ref = useRef(null);
	const refTop = useRef(null);
	const refBottom = useRef(null);
	
	useEffect(() => {
		const resizeableEl = ref.current;
		const styles = window.getComputedStyle(resizeableEl);
		let height = parseInt(styles.height, 10);
		let y = 0;
		
		resizeableEl.style.top = '0px'
		resizeableEl.style.bottom = '0px'
		resizeableEl.onDragStart = () => false
		
	//	Top Resize
		const onPointerMoveTopResize = (e) => {
			const dy = e.clientY - y;
			height = height - dy;
			y = e.clientY;
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpTopResize = (e) => {
			document.removeEventListener("pointermove", onPointerMoveTopResize);
		};
		
		const onPointerDownTopResize = (e) => {
			y = e.clientY;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.bottom = styles.bottom;
			resizeableEl.style.top = null;
			document.addEventListener("pointermove", onPointerMoveTopResize);
			document.addEventListener("pointerup", onPointerUpTopResize);
		};
		
		// Bottom resize
		const onPointerMoveBottomResize = (e) => {
			const dy = e.clientY - y;
			height = height + dy;
			y = e.clientY;
			resizeableEl.style.height = `${height}px`;
		};
		
		const onPointerUpBottomResize = (e) => {
			document.removeEventListener("pointermove", onPointerMoveBottomResize);
		};
		
		const onPointerDownBottomResize = (e) => {
			y = e.clientY;
			const styles = window.getComputedStyle(resizeableEl);
			resizeableEl.style.top = styles.top;
			resizeableEl.style.bottom = null;
			document.addEventListener("pointermove", onPointerMoveBottomResize);
			document.addEventListener("pointerup", onPointerUpBottomResize);
		};
		
		
		// added down listeners
		const resizerTop = refTop.current;
		resizerTop.addEventListener("pointerdown", onPointerDownTopResize);
		const resizerBottom = refBottom.current;
		resizerBottom.addEventListener("pointerdown", onPointerDownBottomResize);
		
		return ()=> {
			resizerTop.removeEventListener("pointerdown", onPointerDownTopResize);
			resizerBottom.removeEventListener("pointerdown", onPointerDownBottomResize);}
	}, []);
	
	return (
		<div className="event-block">
			<div ref={ref} className="resizeable">
				<div ref={refTop} className="resizer resizer-t"></div>
				<div ref={refBottom} className="resizer resizer-b"></div>
			</div>
		</div>
	);
};

export {EventBlock};