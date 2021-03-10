import React from 'react';
import VisualEditor from './components/VisualEditor';
import './App.css';
import 'antd/dist/antd.css';
import { visualConfig } from './utils/visualConfig';
import AppProvider from './components/AppProvider';
function App() {
	return (
		<AppProvider>
			<div className="App">
				<VisualEditor config={visualConfig} />
			</div>
		</AppProvider>
	);
}

export default App;

// import React from 'react';
// import {Button,Table} from 'antd';
// import 'antd/dist/antd.css';
// const Component:React.FC<any> = props=>{
// 	return (
// <div style={{"height":"600px","width":"800px"}}>

// <div style={{"position":"absolute","left":"100px","top":"100px"}}>
//    <Button   type={'primary'} children={'primary'}/>
// </div>
// <div style={{"position":"absolute","left":"104px","top":"177px"}}>
//    <Table   dataSource={[{"key":"1","name":"胡彦斌","age":32,"address":"西湖区湖底公园1号"},{"key":"2","name":"胡彦祖","age":42,"address":"西湖区湖底公园1号"}]} columns={[{"title":"姓名","dataIndex":"name","key":"name"},{"title":"年龄","dataIndex":"age","key":"age"},{"title":"住址","dataIndex":"address","key":"address"}]}/>
// </div>
// </div>
// )
// };
// export default Component;
