import React, { useEffect } from 'react';
import { Form, Input  } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { TableProps } from 'antd/lib/table';

interface ITableOperatorProps {
	form: FormInstance<any>;
	componentProps: TableProps<any>;
}
const { TextArea } = Input;
const TableOperator: React.FC<ITableOperatorProps> = (props) => {
	const { form, componentProps } = props;
	useEffect(
		() => {
			form.setFieldsValue({
				columns: JSON.stringify(componentProps.columns),
				dataSource: JSON.stringify(componentProps.dataSource)
			});
		},
		[ componentProps, form ]
	);
	return (
		<React.Fragment>
			<Form.Item name="columns" label="列配置">
				<TextArea />
			</Form.Item>
			<Form.Item name="dataSource" label="数据源配置">
				<TextArea />
			</Form.Item>
		</React.Fragment>
	);
};
export default TableOperator;
