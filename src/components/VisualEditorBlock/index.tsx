import React, { useMemo, useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { IVisualEditorBlockData } from '../../interfaces/visualEditor';
import { VisualEditorConfig } from '../../utils/utils';
import useCommand from '../../hooks/useCommand';
interface IVisualEditorBlockProps {
	block: IVisualEditorBlockData;
	config: VisualEditorConfig;
	onMouseDown(e: React.MouseEvent): any;
	onContextMenu(e: React.MouseEvent): any;
	isPreview?: boolean;
}
const VisualEditorBlock: React.FC<IVisualEditorBlockProps> = (props) => {
	const { block, config, onMouseDown: propsOnMouseDown, isPreview } = props;
	const { forceUpdateBlock } = useCommand();
	const ref = useRef({} as HTMLDivElement);
	const onContextMenu = (e: React.MouseEvent) => {
		if (isPreview) return;
		props.onContextMenu(e);
	};
	const onMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (isPreview) return;
			e.stopPropagation();
			e.preventDefault();
			propsOnMouseDown(e);
		},
		[ propsOnMouseDown, isPreview ]
	);
	const component = useMemo(
		() => {
			return config.componentMap[block.componentKey];
		},
		[ config.componentMap, block.componentKey ]
	);
	const className = useMemo(
		() => {
			return `${styles.visualEditorBlock} ${isPreview
				? ''
				: `${styles.visualEditorBlockIsEdit} ${block.focus ? styles.visualEditorBlockFocus : ''}`}`;
		},
		[ block.focus, isPreview ]
	);
	const style = useMemo(
		() => {
			return {
				top: `${block.top}px`,
				left: `${block.left}px`
			};
		},
		[ block.left, block.top ]
	);
	const Render = useMemo(
		() => {
			return component.render(block.props);
		},
		[ component, block.props ]
	);
	useEffect(
		() => {
			const { offsetWidth, offsetHeight } = ref.current;
			forceUpdateBlock({
				id: block.id,
				width: offsetWidth,
				height: offsetHeight
			});
		},
		[ block.id, forceUpdateBlock ]
	);
	return (
		<div
			data-id={block.id}
			ref={ref}
			className={className}
			style={style}
			onMouseDown={onMouseDown}
			onContextMenu={onContextMenu}
		>
			{Render}
		</div>
	);
};
export default React.memo(VisualEditorBlock);
