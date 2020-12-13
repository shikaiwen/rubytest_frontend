
import React from "react"
import { Layout, Menu, Breadcrumb, Row, Col,Table,Button} from 'antd';

import store from "../redux/store"
import { useHistory } from "react-router-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import $ from "jquery"
import {  notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


const rowSelection = {


    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

class RightMain extends React.Component{

    constructor(prop){
        super(prop)

        const dataSource = [

          ];

        this.state = {
            cateStr:"",
            dataSource,
            toDeleteRow:''
        }
        

        store.subscribe(()=>{

            this.queryList()

        })
    }

    queryList = ()=>{

        let state = store.getState()
        console.log(`state changed ... ${state}`);
        console.log(state.cateNow.title)

        let cateStr = state.cateNow.title
        let cateId = state.cateNow.key;
        
        $.get(`http://localhost:3000/api/v1/article?cate=${cateId}`).then((resp)=>{
            let data = resp.data;
            if(data instanceof Array){
                data.forEach(e=>{
                    e.key = e.id;
                    e.typeName = cateStr;
                })
            }
            let dataSource = data;
            console.log(dataSource)
            this.setState({cateStr,dataSource});
        })

    }


    rowSelectChange = (selectedRowKeys, selectedRows)=>{

        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        let toDeleteRow = selectedRows[0]
        this.setState({toDeleteRow})

    }

    doDeleteProduct=()=>{

        let row = this.state.toDeleteRow
        if(!row){
            return;
        }

        let id = row.id;
        $.ajax({
            url:`http://localhost:3000/api/v1/article/${id}`,
            method:"DELETE",
            data:{id},
            complete:()=>{
                console.log("delete over...")

                const openNotification = () => {
                    notification.open({
                      message: 'メッセージ',
                      description:
                        '商品削除は完了しました。',
                      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                  };

                openNotification()
                this.queryList()
            }
        })
    }

    addClick(){
        // console.log("addClick...")
        // console.log(this);
        // const history = useHistory();
        // history.push("/add");
        // this.props.history.push("/add");
    }

    render(){

        let storeState = store.getState();
          const columns = [

            {
              title: '商品番号',
              dataIndex: 'no',
              key: 'no',
            },
            {
              title: '商品名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '値段',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'ジャンル',
              dataIndex: 'typeName',
              key: 'typeName',
            },
            {
              title: '説明',
              dataIndex: 'remarks',
              key: 'remarks',
            },
          ];


        return (

            <div style={{marginLeft:10}}>
                <Row style={{padding:10}}>

        <Col span={8}>ジャンル:{this.state.cateStr}</Col>
        <Col span={10}></Col>
                    <Col>
                        <Route render={({ history}) => (
                        <Button type="primary"
                            onClick={() => { history.push('/add') }}>新規</Button>
                        )} />
                    </Col>
                    <Col span={1}></Col>
                    <Button type="primary"
                            onClick={this.doDeleteProduct}>削除</Button>
                    <Col>
                    </Col>
                </Row>

                <Table 
        rowSelection={{
          type: "radio",
          onChange:this.rowSelectChange,
        }}
         dataSource={this.state.dataSource} 
         columns={columns} />;

            </div>
        )
    }
}


export default RightMain