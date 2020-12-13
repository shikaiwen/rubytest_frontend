
import React from "react"
import { Layout, Menu, Breadcrumb, Row, Col,Table,Button} from 'antd';

import store from "../redux/store"
import { useHistory } from "react-router-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import $ from "jquery"

class RightMain extends React.Component{

    constructor(prop){
        super(prop)

        const dataSource = [

          ];

        this.state = {
            cateStr:"",
            dataSource
        }
        

        store.subscribe(()=>{
            let state = store.getState()
            console.log(`state changed ... ${state}`);
            console.log(state.cateNow.title)

            let cateStr = state.cateNow.title
            let cateId = state.cateNow.key;
            
            $.get(`http://localhost:3000/api/v1/article?cate=${cateId}`).then((resp)=>{
                let data = resp.data;

                // console.log(resp.data)

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

        })


    }


    addClick(){
        console.log("addClick...")
        console.log(this);

        const history = useHistory();
        history.push("/add");
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

            <div>

                <Row>
        <Col>ジャンル:{this.state.cateStr}</Col>
                    <Col>
                        <Route render={({ history}) => (

                        <Button type="primary"
                            onClick={() => { history.push('/add') }}>新規</Button>
                        )} />
                    </Col>
                </Row>

                <Table dataSource={this.state.dataSource} columns={columns} />;

            </div>
        )
    }
}


export default RightMain