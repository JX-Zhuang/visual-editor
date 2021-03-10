import React, { useEffect } from 'react';
import { Radio, Select, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ButtonProps } from 'antd/lib/button';
const buttonTypes = ['default', 'primary', 'ghost', 'dashed', 'link', 'text'].map((type) => ({
	label: type,
	value: type
}));
interface IButtonOperatorProps {
	form: FormInstance<any>;
	componentProps: ButtonProps;
}
const ButtonOperator: React.FC<IButtonOperatorProps> = (props) => {
	const { form, componentProps } = props;
	useEffect(
		() => {
			form.setFieldsValue({
				type: componentProps.type,
				danger: !!componentProps.danger,
				children: componentProps.children
			});
		},
		[componentProps, form]
	);
	return (
		<React.Fragment>
			<Form.Item name="children" label="按钮内容">
				<Input />
			</Form.Item>
			<Form.Item name="type" label="按钮类型">
				<Select options={buttonTypes} virtual={false} />
			</Form.Item>
			<Form.Item name="danger" label="警告按钮">
				<Radio.Group>
					<Radio value={true}>是</Radio>
					<Radio value={false}>否</Radio>
				</Radio.Group>
			</Form.Item>
		</React.Fragment>
	);
};
export default ButtonOperator;
