import React, { useEffect } from 'react';
import { Select, Form, Input, Radio } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { TextProps } from 'antd/lib/typography/Text';
interface ITypographyTitleOperatorProps {
	form: FormInstance<any>;
	componentProps: TextProps;
}

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
				children: componentProps.children,
				type: componentProps.type,
				strong:componentProps.strong
			});
		},
		[ componentProps, form ]
	);
	return (
		<React.Fragment>
			<Form.Item name="children" label="按钮内容">
				<Input />
			</Form.Item>
			<Form.Item name="strong" label="是否加粗">
				<Radio.Group>
					<Radio value={true}>是</Radio>
					<Radio value={false}>否</Radio>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="type" label="文本类型">
				<Select options={types} virtual={false} />
			</Form.Item>
		</React.Fragment>
	);
};
export default TypographyTitleOperator;
