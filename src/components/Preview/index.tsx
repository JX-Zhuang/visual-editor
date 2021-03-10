import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import useVisualModelData from '../../hooks/useVisualModelData';
import { visualConfig } from '../../utils/visualConfig';
import NewPage from '../NewPage';
import genCode from './genCode';
import styles from './index.module.scss';
import hljs from 'highlight.js';
import { LeftOutlined } from '@ant-design/icons';
// import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
// import xml from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/monokai-sublime.css';

interface IPreviewProps {
	visible: boolean;
	onCancel(): any;
}
const Preview: React.FC<IPreviewProps> = (props) => {
	const ref = useRef({} as HTMLPreElement);
	const state = useVisualModelData();
	const { visible, onCancel } = props;
	useEffect(
		() => {
			if (!visible) return;
			// hljs.highlightAll();
			hljs.registerLanguage('javascript', javascript);
			// hljs.registerLanguage('xml', xml);
			// hljs.registerLanguage('typescript', typescript);
			hljs.highlightBlock(ref.current);
		},
		[ visible ]
	);
	return (
		<Modal width="100%" closable={false} visible={visible} footer={null} wrapClassName={styles.root}>
			<div className={styles.mainContent}>
				<div className={styles.header}>
					<span className={styles.cancel} onClick={onCancel}>
						<LeftOutlined /> Preview
					</span>
				</div>
				<div className={styles.newPageContainer}>
					<pre ref={ref} className={styles.code}>
						{genCode(state.currentModel)}
					</pre>
					<NewPage config={visualConfig} isPreview={true} />
				</div>
			</div>
		</Modal>
	);
};
export default Preview;
