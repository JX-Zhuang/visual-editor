import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
interface IBlockResizeProps {}
enum Direction {
	start = 'start',
	center = 'center',
	end = 'end'
}
const MIN_HIGHT = 10;
const MIN_WIDTH = 10;
const BlockResize: React.FC<IBlockResizeProps> = (props) => {
	const ref = useRef({} as HTMLDivElement);
	const [ style, setStyle ] = useState({} as Record<string, string>);
	const resizeX = (e: React.MouseEvent, direction: { vertical: Direction; horizontal: Direction }) => {
		const startX = e.clientX;
		const startY = e.clientY;
		const startWidth = ref.current.offsetWidth;
		const startHeight = ref.current.offsetHeight;
		const left = ref.current.offsetLeft;
		const top = ref.current.offsetTop;
		const reset = () => {
			document.removeEventListener('mousemove', mouseMove);
			document.removeEventListener('mouseup', mouseUp);
		};
		const mouseMove = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			const right = direction.horizontal === Direction.end;
			const bottom = direction.vertical === Direction.end;
			const durationX = direction.horizontal === Direction.center ? 0 : e.clientX - startX;
			const durationY = direction.vertical === Direction.center ? 0 : e.clientY - startY;
			const width = startWidth + (right ? durationX : -durationX);
			const height = startHeight + (bottom ? durationY : -durationY);
			if (width <= MIN_WIDTH || height <= MIN_HIGHT) return;
			setStyle({
				width: width + 'px',
				left: (right ? left : left + durationX) + 'px',
				height: height + 'px',
				top: (bottom ? top : top + durationY) + 'px'
			});
		};
		const mouseUp = (e: MouseEvent) => {
			reset();
		};
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);
	};
	return (
		<div className={styles.root} style={style} ref={ref}>
			<div
				className={styles.left}
				onMouseDown={(e) => resizeX(e, { vertical: Direction.center, horizontal: Direction.start })}
			/>
			<div
				className={styles.right}
				onMouseDown={(e) => resizeX(e, { vertical: Direction.center, horizontal: Direction.end })}
			/>
			<div
				className={styles.top}
				onMouseDown={(e) => resizeX(e, { vertical: Direction.start, horizontal: Direction.center })}
			/>
			<div
				className={styles.bottom}
				onMouseDown={(e) => resizeX(e, { vertical: Direction.end, horizontal: Direction.center })}
			/>
		</div>
	);
};
export default BlockResize;
