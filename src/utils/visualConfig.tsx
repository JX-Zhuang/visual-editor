import { createVisualEditorConfig } from './utils';
import { IVisualEditorComponent, IVisualEditorComponentNode } from '../interfaces/visualEditor';
import * as Ants from 'antd/es';
import get from 'lodash/get';
import { IComponentNodeConfig, COMPONENT_NAMES, IProps } from '../interfaces/components';
export const visualConfig = createVisualEditorConfig();
const componentsConfig: IComponentNodeConfig[] = [
	{
		label: 'Typography',
		components: [
			{
				componentName: COMPONENT_NAMES.TYPOGRAPHY_TITLE,
				props: {
					level: 1,
					children: 'Title'
				}
			},
			{
				componentName: COMPONENT_NAMES.TYPOGRAPHY_TEXT,
				props: {
					level: 1,
					children: 'Text'
				}
			}
		]
	},
	{
		label: 'Button',
		components: [
			{
				componentName: COMPONENT_NAMES.BUTTON,
				props: {
					children: 'primary',
					type: 'primary'
				}
			},
			{
				componentName: COMPONENT_NAMES.BUTTON,
				props: {
					children: 'danger',
					type: 'primary',
					danger: true
				}
			}
		]
	}
];
const createComponent = (
	componentName: COMPONENT_NAMES,
	id: string,
	props: Record<string, IProps>
): IVisualEditorComponent => {
	const Component = get(Ants, componentName) as React.FC;
	return {
		label: '',
		preview: () => <Component {...props} />,
		render: (props) => <Component {...props} />,
		key: `${componentName}.${id}`,
		componentName,
		props: props
	};
};
const createNode = (componentConfig: IComponentNodeConfig): IVisualEditorComponentNode => {
	const { label, components } = componentConfig;
	return {
		id: label,
		label: label,
		components: components.map((item, index) => createComponent(item.componentName, String(index), item.props))
	};
};
const components: IVisualEditorComponentNode[] = componentsConfig.map((component) => createNode(component));
components.forEach((item) => visualConfig.registry(item));
