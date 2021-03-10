import React, { useEffect } from 'react';
import { Select, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { TitleProps } from 'antd/lib/typography/Title';
interface ITypographyTitleOperatorProps {
	form: FormInstance<any>;
	componentProps: TitleProps;
}
const levels = [
	{ label: 'h1', value: 1 },
	{ label: 'h2', value: 2 },
	{ label: 'h3', value: 3 },
	{ label: 'h4', value: 4 },
	{ label: 'h5', value: 5 }
];
const types = [
	{
		label: 'secondary',
		value: 'secondary'
	},
	{
		label: 'success',
		value: 'success'
	},
	{
		label: 'warning',
		value: 'warning'
	},
	{
		label: 'danger',
		value: 'danger'
	}
];
const TypographyTitleOperator: React.FC<ITypographyTitleOperatorProps> = (props) => {
	const { form, componentProps } = props;
	useEffect(
		() => {
			form.setFieldsValue({
				level: componentProps.level,
				children: componentProps.children,
				type: componentProps.type
			});
		},
		[ componentProps, form ]
	);
	return (
		<React.Fragment>
			<Form.Item name="children" label="按钮内容">
				<Input />
			</Form.Item>
			<Form.Item name="level" label="重要程度">
				<Select options={levels} virtual={false} />
			</Form.Item>
			<Form.Item name="type" label="文本类型">
				<Select options={types} virtual={false} />
			</Form.Item>
		</React.Fragment>
	);
};
export default TypographyTitleOperator;
