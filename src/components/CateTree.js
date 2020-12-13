
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
        super(prop);

        setTimeout(()=>{
            store.dispatch({
                type: 'ADD',
                payload: {key:"1",title: 'スポーツ'}
              });
        },500)

    }

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
        // console.log(store)
        store.dispatch({
            type: 'ADD',
            payload: {key:info.node.key,title:info.node.title}
          });
    };
    
    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
    };

    render(){
        return (
            <div style={{height:800}}>
                <Tree height="800"
                
                defaultExpandedKeys={['0']}
                defaultSelectedKeys={['1']}
                // defaultCheckedKeys={['1']}
                onSelect={this.onSelect}
                treeData={treeData}
                />
            </div>
          );
    }

}



export default CateTree;