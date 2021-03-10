import React, { useEffect, useState } from 'react';
import { Form, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ChromePicker } from 'react-color';
import { IVisualEditorContainerData } from '../../interfaces/visualEditor';
interface IContainerOperatorProps {
	form: FormInstance<any>;
	componentProps: IVisualEditorContainerData;
}
const ContainerOperator: React.FC<IContainerOperatorProps> = (props) => {
	const { form, componentProps } = props;
	const [ background, setBackground ] = useState('');
	useEffect(
		() => {
			setBackground(componentProps.background);
		},
		[ componentProps.background ]
	);
	useEffect(
		() => {
			form.setFieldsValue({
				width: componentProps.width,
				height: componentProps.height,
				background:componentProps.background
			});
		},
		[ componentProps, form ]
	);
	return (
		<React.Fragment>
			<Form.Item name="width" label="容器宽度">
				<InputNumber />
			</Form.Item>
			<Form.Item name="height" label="容器高度">
				<InputNumber />
			</Form.Item>
			<Form.Item name="background" label="容器背景色">
				<ChromePicker
					color={background}
					onChangeComplete={(color) => {
						setBackground(color.hex);
						form.setFieldsValue({
							background: color.hex
						});
					}}
				/>
			</Form.Item>
		</React.Fragment>
	);
};
export default ContainerOperator;
