
import React from "react"
import ReactDom from "react-dom"
import { Tree } from 'antd';
import store from "../redux/store"

const treeData = [
    {
      title: 'ジャンル',
      key: '0',
      children: [
        {
          title: 'スポーツ',
          key: '1',
        },
        {
            title: '家電',
            key: '2',
        },
        {
            title: '書籍',
            key: '3',
        },
        {
            title: '食品',
            key: '4',
        },
        {
            title: '日用雑貨',
            key: '5',
        },

      ],
    },
  ];

class CateTree extends React.Component{

    constructor(prop){
        super(prop)
    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        // console.log(store)
        store.dispatch({
            type: 'ADD_TODO',
            payload: {key:info.node.key,title:info.node.title}
          });
    };
    
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
    };


    render(){
        return (
            <Tree height="800"
              
              defaultExpandedKeys={['0']}
              defaultSelectedKeys={['0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              treeData={treeData}
            />
          );
    }

}



export default CateTree;