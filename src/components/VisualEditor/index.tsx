import React, { useRef, useMemo, useState } from 'react';
import styles from './index.module.scss';
import VisualEditorOperator from '../VisualEditorOperator';
import { creatNewBlock, VisualEditorConfig } from '../../utils/utils';
import { IVisualEditorComponent } from '../../interfaces/visualEditor';
import Header from '../Header';
import useCommand from '../../hooks/useCommand';
import VisualMenu from '../VisualMenu';
import visualModelExecuters from '../../utils/visualModelExecuters';
import useVisualModelData from '../../hooks/useVisualModelData';
import Preview from '../Preview';
import NewPage from '../NewPage';
interface IVisualEditorProps {
	config: VisualEditorConfig;
}
const VisualEditor: React.FC<IVisualEditorProps> = (props) => {
	const { config } = props;
	const [ isPreview, setIsPreview ] = useState(false);
	const newPageRef = useRef({} as HTMLDivElement);
	const state = useVisualModelData();
	const { updateModel } = useCommand();
	const model = state.currentModel;
	const focusBlocks = useMemo(
		() => {
			return model.blocks.filter((block) => block.focus);
		},
		[ model.blocks ]
	);
	let component = null as null | IVisualEditorComponent;
	const resetNewPageEvent = () => {
		newPageRef.current.removeEventListener('dragenter', newPageEventHandler.dragenter);
		newPageRef.current.removeEventListener('dragover', newPageEventHandler.dragover);
		newPageRef.current.removeEventListener('dragleave', newPageEventHandler.dragleave);
		newPageRef.current.removeEventListener('drop', newPageEventHandler.drop);
		component = null;
	};
	const newPageEventHandler = {
		dragenter: (e: DragEvent) => {
			// console.log('dragenter');
			e.dataTransfer!.dropEffect = 'move';
		},
		dragover: (e: DragEvent) => {
			// console.log('dragover');
			e.preventDefault();
		},
		dragleave: (e: DragEvent) => {
			// console.log('dragleave');
			e.dataTransfer!.dropEffect = 'none';
		},
		drop: (e: DragEvent) => {
			console.log('dropppppp', e);
			const newModel = visualModelExecuters.addBlock(
				model,
				creatNewBlock({
					component: component!,
					top: e.offsetY,
					left: e.offsetX
				})
			);
			updateModel(newModel);
			resetNewPageEvent();
		}
	};
	const visualMenuOnDragStart = (e: React.MouseEvent, current: IVisualEditorComponent) => {
		newPageRef.current.addEventListener('dragenter', newPageEventHandler.dragenter);
		newPageRef.current.addEventListener('dragover', newPageEventHandler.dragover);
		newPageRef.current.addEventListener('dragleave', newPageEventHandler.dragleave);
		newPageRef.current.addEventListener('drop', newPageEventHandler.drop);
		component = current;
	};
	const visualMenuOnDragEnd = (e: React.DragEvent) => {
		// console.log('dragend', component, e);
		// 有可能拖到其他区域，所以要重置
		resetNewPageEvent();
	};
	const lastFocusBlock = useMemo(
		() => {
			return (
				focusBlocks[focusBlocks.length - 1] || {
					props: model.container
				}
			);
		},
		[ focusBlocks, model ]
	);
	const apply = (value: any) => {
		let container = model.container;
		let blocks = model.blocks;
		if (lastFocusBlock.componentName) {
			blocks = model.blocks.map(
				(block) =>
					block === lastFocusBlock
						? {
								...lastFocusBlock,
								props: value
							}
						: block
			);
		} else {
			container = Object.assign({}, container, value);
		}
		updateModel({
			container,
			blocks
		});
	};
	const preview = () => {
		setIsPreview(true);
	};
	const closePreview = () => {
		setIsPreview(false);
	};
	return (
		<div className={styles.root}>
			<Header preview={preview} />
			<div className={styles.content}>
				<div className={styles.componentsMenu}>
					<VisualMenu
						onDragStart={visualMenuOnDragStart}
						onDragEnd={visualMenuOnDragEnd}
						componentNodeList={config.componentNodeList}
					/>
				</div>
				<NewPage newPageRef={newPageRef} config={config} />
				<div className={styles.operationMenu}>
					<VisualEditorOperator
						apply={apply}
						componentProps={lastFocusBlock.props}
						componentName={lastFocusBlock && lastFocusBlock.componentName}
					/>
				</div>
			</div>
			<Preview visible={isPreview} onCancel={closePreview} />
		</div>
	);
};
export default VisualEditor;
