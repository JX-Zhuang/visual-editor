import React, { useMemo } from 'react';
import { Form, Button, Space } from 'antd';
import styles from './index.module.scss';
import ContainerOperator from './ContainerOperator';
import ButtonOperator from './ButtonOperator';
import TableOperator from './TableOperator';
import TypographyTitleOperator from './TypographyTitleOperator';
import TypographyTextOperator from './TypographyTextOperator';
import { COMPONENT_NAMES, IProps } from '../../interfaces/components';
import { IVisualEditorContainerData } from '../../interfaces/visualEditor';
const componentNameMapOperator: Record<COMPONENT_NAMES, React.FC<any>> = {
	[COMPONENT_NAMES.BUTTON]: ButtonOperator,
	[COMPONENT_NAMES.INPUT]: () => <div>333</div>,
	[COMPONENT_NAMES.TABLE]: TableOperator,
	[COMPONENT_NAMES.TYPOGRAPHY_TITLE]: TypographyTitleOperator,
	[COMPONENT_NAMES.TYPOGRAPHY_TEXT]: TypographyTextOperator
};
interface IVisualEditorOperatorProps {
	componentName: COMPONENT_NAMES | null;
	componentProps: IProps | IVisualEditorContainerData;
	apply(props: IProps | IVisualEditorContainerData): any;
}
const VisualEditorOperator: React.FC<IVisualEditorOperatorProps> = (props) => {
	const { componentName, componentProps, apply } = props;
	const [ form ] = Form.useForm();
	const reset = () => {
		form.resetFields();
	};
	const ComponentOperator = useMemo(
		() => {
			if (!componentName) {
				return ContainerOperator;
			}
			return componentNameMapOperator[componentName]
				? componentNameMapOperator[componentName]
				: ContainerOperator;
		},
		[ componentName ]
	);
	const onFinish = (value: any) => {
		console.log(value);
		apply(value);
	};
	return (
		<Form form={form} onFinish={onFinish} className={styles.root}>
			<Form.Item>
				<Space>
					<Button type="primary" htmlType="submit">
						应用
					</Button>
					<Button onClick={reset}>重置</Button>
				</Space>
			</Form.Item>
			<div className={styles.operatorContainer}>
				<ComponentOperator form={form} componentProps={componentProps as any} />
			</div>
		</Form>
	);
};
export default VisualEditorOperator;
