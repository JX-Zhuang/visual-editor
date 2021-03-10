import { Button, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import styles from './index.module.scss';
import useCommand from '../../hooks/useCommand';
import { UndoOutlined, RedoOutlined, DeleteOutlined, EyeOutlined, SyncOutlined } from '@ant-design/icons';
interface IButton {
	label: string;
	tips?: string;
	icon: JSX.Element;
	handler(): any;
}
interface IHeaderProps {
	buttons: IButton[];
}
const Header: React.FC<IHeaderProps> = React.memo((props) => {
	const { buttons } = props;
	return (
		<div className={styles.root}>
			{buttons.map((button, index) => (
				<Tooltip placement="bottom" key={index} title={button.tips}>
					<Button className={styles.button} onClick={button.handler}>
						{button.icon}
						<div>{button.label}</div>
					</Button>
				</Tooltip>
			))}
		</div>
	);
});
interface IHeaderContainerProps {
	preview(): any;
}
const HeaderContainer: React.FC<IHeaderContainerProps> = (props) => {
	const { preview } = props;
	const { undo, redo, deleteAction, clearAll } = useCommand();
	const buttons = useMemo<IButton[]>(
		() => {
			return [
				{
					label: '撤销',
					tips: 'ctrl+z',
					icon: <UndoOutlined />,
					handler: undo //commander.undo
				},
				{
					label: '重做',
					tips: 'ctrl+y, ctrl+shift+z',
					handler: redo,
					icon: <RedoOutlined />
				},
				{
					label: '删除',
					handler: deleteAction,
					tips: 'delete',
					icon: <DeleteOutlined />
				},
				{
					label: '清空',
					handler: clearAll,
					icon: <SyncOutlined />
				},
				{
					label: '预览',
					handler: preview,
					tips: '',
					icon: <EyeOutlined />
				}
			];
		},
		[ undo, redo, deleteAction, preview ,clearAll]
	);
	return <Header buttons={buttons} />;
};
export default React.memo(HeaderContainer);
