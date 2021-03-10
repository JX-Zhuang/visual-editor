import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { IVisualEditorComponent, IVisualEditorComponentNode } from '../../interfaces/visualEditor';
const { Panel } = Collapse;
interface IVisualMenuProps {
	componentNodeList: IVisualEditorComponentNode[];
	onDragStart(e: React.MouseEvent, component: IVisualEditorComponent): any;
	onDragEnd(e: React.DragEvent): any;
}
const VisualMenu: React.FC<IVisualMenuProps> = (props) => {
	const { componentNodeList, onDragEnd } = props;
	const onDragStart = (e: React.MouseEvent, component: IVisualEditorComponent) => {
		props.onDragStart(e, component);
	};
	return (
		<Collapse
			bordered={false}
			ghost
			expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
		>
			{componentNodeList.map((componentNode) => (
				<Panel key={componentNode.id} header={componentNode.label}>
					{componentNode.components.map((component, index) => {
						return (
							<div
								key={index}
								className={styles.componentContainer}
								draggable
								onDragStart={(e) => onDragStart(e, component)}
								onDragEnd={onDragEnd}
								// onDragStart={(e) => draggierRef.current.dragstart(e, component)}
							>
								{component.preview()}
							</div>
						);
					})}
				</Panel>
			))}
		</Collapse>
	);
};
export default VisualMenu;
