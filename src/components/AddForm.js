

import React from "react";
import ReactDOM from "react-dom";

import store from "../redux/store"
import { Layout, Menu, Breadcrumb, Row, Col} from 'antd';
import { Form, Input, Checkbox } from 'antd';
import { Button, DatePicker, version } from "antd";
import $ from "jquery"
import {Route, BrowserRouter as Router} from "react-router-dom";
const { Header, Content, Footer ,Sider} = Layout;



const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  

class AddForm extends React.Component{

    constructor(props){
      super(props)
      var storeState = store.getState()
      console.log(`storeState:`)
      console.log(storeState);

      let cateNow = storeState.cateNow;
      let t = cateNow? cateNow.key : "1";

      this.state = {
          cate:t,
          no:'A001',
        name:'test',
        price:'100',
        remarks:'コスパ抜群です'
      }

    //   const form = Form.useForm();
    //   form.setFieldsValue(this.state);
    //   this.setState(this.state)
        this.jumpBtnRef = React.createRef();
    }

    jumpToResult=()=>{
        // window.history.push('/success')
        this.jumpBtnRef.current.click()

        // console.log(this.jumpBtnRef.current.click())
        
    }
  
    onFinish = (values) => {
      console.log('Success:', values);
    };
  
    onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    submitClick = ()=>{
      console.log("submitClick");
      let data = this.state;
      $.post(`http://localhost:3000/api/v1/article`,data).then((resp)=>{
          console.log(resp)
          this.jumpBtnRef.current.click()

          if(resp.success){
          }
      })
    //   console.log(data)
    }


  
    changeValue = (evt)=>{
        let domElt = evt.target;
        console.log(evt.target.name)
        console.log(evt.target.value)
        var obj = {}
        obj[evt.target.name] = evt.target.value
        this.setState(obj)

        console.log(store.getState())
        // console.log(`${domElt.attributes.name}:${evt.target.value}`)
    }


    render(){
      return (
        <Content>

            <Row justify="center">
                <Col span={12} style={{ 'paddingTop': '50px' }}>
                <label>商品番号</label>
                {/* <Input onChange={this.setState({name:value})}/> */}
                <Input name="no" type="text" value={this.state.no}  onChange={this.changeValue}></Input>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12} >
                <label>商品名</label>
                <Input name="name" type="text" value={this.state.name} onChange={this.changeValue}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12} >
                <label>価格</label>
                <Input name="price" type="text" value={this.state.price} onChange={this.changeValue}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={12} >
                <label>説明</label>
                <Input name="remarks" type="remarks" value={this.state.remarks} onChange={this.changeValue}/>
                </Col>
            </Row>

            <Row justify="center">
                <Col span={12} >
                    <Button type="primary" onClick={this.submitClick}>登録</Button>
                </Col>
                <Col span={12} >

                    {/* <Button type="primary"  onClick={this.jumpToResult}>Jump</Button> */}

                    <Route render={({ history}) => (
                    <Button ref={this.jumpBtnRef} type="primary"
                        onClick={() => { history.push('/success') }}>jump</Button>
                    )} />

                </Col>


            </Row>
        </Content>
      );
      
    }
  
  
  }
  

  
  export default AddForm