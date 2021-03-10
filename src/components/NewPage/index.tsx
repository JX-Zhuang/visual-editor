import React, { useMemo, useCallback, useState } from 'react';
import styles from './index.module.scss';
import VisualEditorBlock from '../VisualEditorBlock';
import { VisualEditorConfig } from '../../utils/utils';
import { IVisualEditorBlockData, IVisualEditorMarkLines } from '../../interfaces/visualEditor';
import useCommand from '../../hooks/useCommand';
import useVisualModelData from '../../hooks/useVisualModelData';
interface IVisualEditorProps {
	config: VisualEditorConfig;
	isPreview?: boolean;
	newPageRef?: any;
	onMouseDown?: (e: React.MouseEvent) => any;
}
const methods = {
	clearFocus: (blocks: IVisualEditorBlockData[], excludeBlock?: IVisualEditorBlockData): IVisualEditorBlockData[] => {
		if (blocks.length === 0) return blocks;
		return blocks.map((item) => ({
			...item,
			focus: item === excludeBlock ? excludeBlock.focus : false
		}));
	}
};
const VisualEditor: React.FC<IVisualEditorProps> = (props) => {
	const [ rightClickId, setRightClickId ] = useState('');
	const [ menuStyle, setMenuStyle ] = useState({} as Record<string, string>);
	const [ showContextMenu, setShowContextMenu ] = useState(false);
	const [ markLine, setMarkLine ] = useState({
		x: null as null | number,
		y: null as null | number
	});
	const { config, isPreview } = props;
	const state = useVisualModelData();
	const {
		deleteAction: deleteActionCommand,
		updateModel,
		forceUpdateModel,
		copyBlock: copyBlockCommand
	} = useCommand();
	const model = state.currentModel;
	const focusBlocks = useMemo(
		() => {
			return model.blocks.filter((block) => block.focus);
		},
		[ model.blocks ]
	);
	const newPageOnMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (isPreview) return;
			e.stopPropagation();
			setShowContextMenu(false);
			if (focusBlocks.length === 0) return;
			updateModel({
				...model,
				blocks: methods.clearFocus(model.blocks)
			});
		},
		[ focusBlocks, updateModel, model, isPreview ]
	);
	const newPageStyle = useMemo(
		() => {
			const { width, height, background } = model.container;
			return {
				width: `${width}px`,
				height: `${height}px`,
				background
			};
		},
		[ model.container ]
	);
	const blockOnMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (isPreview) return;
			const id = (e.currentTarget as HTMLElement).dataset.id;
			if (!id) return;
			const block = model.blocks.find((item) => item.id === id);
			if (!block) return;
			let dragState = {
				startX: 0,
				startY: 0,
				startLeft: 0,
				startTop: 0,
				markLines: {} as IVisualEditorMarkLines
			};
			let moveStartTime = Date.now();
			const mouseMove = (e: MouseEvent) => {
				if (Date.now() - moveStartTime < 100) return;
				moveStartTime = Date.now();
				let { clientX: moveX, clientY: moveY } = e;
				const { startX, startY } = dragState;
				if (e.shiftKey) {
					if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
						moveY = startY;
					} else {
						moveX = startX;
					}
				}
				const currentLeft = dragState.startLeft + moveX - startX;
				const currentTop = dragState.startTop + moveY - startY;
				// const currentMask = {
				// 	x: null as null | number,
				// 	y: null as null | number
				// };
				const mark = { x: null as null | number, y: null as null | number };

				for (let i = 0; i < dragState.markLines.y.length; i++) {
					const { top, showTop } = dragState.markLines.y[i];
					if (Math.abs(top - currentTop) < 5) {
						moveY = top + startY - dragState.startTop;
						mark.y = showTop;
						break;
					}
				}
				for (let i = 0; i < dragState.markLines.x.length; i++) {
					const { left, showLeft } = dragState.markLines.x[i];
					if (Math.abs(left - currentLeft) < 5) {
						moveX = left + startX - dragState.startLeft;
						mark.x = showLeft;
						break;
					}
				}
				const durationX = moveX - startX;
				const durationY = moveY - startY;
				newBlocks = newBlocks.map((item, index) => {
					return item.focus
						? {
								...item,
								left: durationX + item.left,
								top: durationY + item.top
							}
						: item;
				});
				dragState.startX = moveX;
				dragState.startY = moveY;
				dragState.startLeft = currentLeft;
				dragState.startTop = currentTop;
				forceUpdateModel({
					...model,
					blocks: newBlocks
				});
				setMarkLine(mark);
			};
			const mouseUp = () => {
				reset();
				setMarkLine({ x: null, y: null });
			};
			const reset = () => {
				document.removeEventListener('mousemove', mouseMove);
				document.removeEventListener('mouseup', mouseUp);
			};
			reset();
			let newBlocks = model.blocks;
			if (e.shiftKey) {
				const focusBlocks = newBlocks.filter((block) => block.focus);
				newBlocks = newBlocks.map(
					(item) =>
						item === block
							? {
									...item,
									focus: focusBlocks.length <= 1 ? true : !item.focus
								}
							: item
				);
			} else {
				if (!block.focus) {
					newBlocks = newBlocks.map((item) => ({
						...item,
						focus: item === block ? true : false
					}));
				}
			}
			if (newBlocks !== model.blocks) {
				updateModel({
					...model,
					blocks: newBlocks
				});
			}
			const focusBlocks = newBlocks.filter((block) => block.focus);
			const unfocusBlocks = newBlocks.filter((block) => !block.focus);
			const lastFocusBlock = focusBlocks[focusBlocks.length - 1];
			dragState = {
				startX: e.clientX,
				startY: e.clientY,
				startLeft: lastFocusBlock ? lastFocusBlock.left : 0,
				startTop: lastFocusBlock ? lastFocusBlock.top : 0,
				markLines: (() => {
					let lines: IVisualEditorMarkLines = { x: [], y: [] };
					if (lastFocusBlock) {
						const { width, height } = lastFocusBlock;
						unfocusBlocks.forEach((block) => {
							const { width: w, height: h, left: l, top: t } = block;
							lines.y.push({ top: t, showTop: t }); //顶部对齐顶部
							lines.y.push({ top: t + h, showTop: t + h }); //顶部对齐底部
							lines.y.push({ top: t + h / 2 - height / 2, showTop: t + h / 2 }); //中间对齐中间（垂直）
							lines.y.push({ top: t - height, showTop: t }); //底部对齐顶部
							lines.y.push({ top: t + h - height, showTop: t + h }); //底部对齐底部

							lines.x.push({ left: l, showLeft: l }); //顶部对齐顶部
							lines.x.push({ left: l + w, showLeft: l + w }); //顶部对齐底部
							lines.x.push({ left: l + w / 2 - width / 2, showLeft: l + w / 2 }); //中间对齐中间（垂直）
							lines.x.push({ left: l - width, showLeft: l }); //底部对齐顶部
							lines.x.push({ left: l + w - width, showLeft: l + w }); //底部对齐底部
						});
					}
					return lines;
				})()
			};
			document.addEventListener('mousemove', mouseMove);
			document.addEventListener('mouseup', mouseUp);
		},
		[ model, updateModel, forceUpdateModel, isPreview, setMarkLine ]
	);
	// e 类型
	const onContextMenu = useCallback((e: any) => {
		e.stopPropagation();
		e.preventDefault();
		const currentTarget = e.currentTarget;
		const id = currentTarget.dataset.id;
		setMenuStyle({
			top: e.target.offsetTop + e.target.offsetHeight + 'px',
			left: e.target.offsetLeft + e.target.offsetWidth + 'px'
		});
		if (typeof id === 'string') {
			setRightClickId(id);
			setShowContextMenu(true);
		}
	}, []);
	const copyBlock = () => {
		setShowContextMenu(false);
		copyBlockCommand(rightClickId);
	};
	const deleteAction = () => {
		setShowContextMenu(false);
		deleteActionCommand();
	};
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<div className={styles.body}>
					{showContextMenu ? (
						<div style={menuStyle} className={styles.menu}>
							<div className={styles.item} onClick={copyBlock}>
								复制
							</div>
							<div className={styles.item} onClick={deleteAction}>
								删除
							</div>
						</div>
					) : null}
					<div
						className={
							styles.newPage + ` ${!isPreview && focusBlocks.length <= 0 ? styles.focusNewPage : ''}`
						}
						style={newPageStyle}
						ref={props.newPageRef}
						onMouseDown={newPageOnMouseDown}
					>
						{model.blocks.map((item, index) => (
							<VisualEditorBlock
								isPreview={isPreview}
								config={config}
								block={item}
								key={item.id}
								onMouseDown={blockOnMouseDown}
								onContextMenu={onContextMenu}
							/>
						))}
						{markLine.x !== null && <div className={styles.markX} style={{ left: `${markLine.x}px` }} />}
						{markLine.y !== null && <div className={styles.markY} style={{ top: `${markLine.y}px` }} />}
					</div>
				</div>
			</div>
		</div>
	);
};
export default VisualEditor;
