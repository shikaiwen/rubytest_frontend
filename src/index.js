
import React from "react";
import ReactDOM from "react-dom";
import { Button, DatePicker, version } from "antd";
import { Layout, Menu, Breadcrumb, Row, Col} from 'antd';

import { createStore } from "redux";

import "antd/dist/antd.css";
import store from "./redux/store"
import CateTree from "./components/CateTree.js"
import RightMain from "./components/RightMain.js"
import AddForm from "./components/AddForm"

import { Provider } from "react-redux";
import {Route, BrowserRouter as Router} from "react-router-dom";
import { Form, Input, Checkbox } from 'antd';

const { Header, Content, Footer ,Sider} = Layout;




class Success extends React.Component{

  constructor(props){
    super(props)

    this.jumpBtnRef = React.createRef();
  }


  render(){

    return (
      <Content>
          <Row justify="center" >
      
              <Col span={5} style={{padding:5, height:'100%'}}>
                  {/* <Button type="primary"  onClick={this.jumpToResult}>Jump</Button> */}
                  <div style={{marginTop:'100px', marginBottom:20 }} >
                    登録は完了しました。
                  </div>
                  <Route render={({ history}) => (
                  <Button ref={this.jumpBtnRef} type="primary"
                      onClick={() => { history.push('/') }}>戻る</Button>
                  )} />
              </Col>
          </Row>
      </Content>
    )
  }
 
}




function ProductMain(){

  return (
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
        <Layout>
          <Row style={{marginTop:20}}>
            <Col   span={3}>
              <CateTree />
            </Col>
            <Col span={15}>
              

            <div>
  
              <RightMain/>
            </div>
            </Col>
          </Row>
  
        </Layout>
        </div>
      </Content>
    
  )
}


const routing = (
 
  <Router>
  {/* <Route exact path="/product" component={ProductMain} /> */}
  <Provider store={store}>
  <Layout className="layout">
  <Header>
   <div className="logo" />
   <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
     <Menu.Item key="1">商品管理</Menu.Item>
   </Menu>
  </Header>
  <Content>
    <Route exact path="/" component={ProductMain} />
    <Route exact path="/add" component={AddForm} />
    <Route exact path="/success" component={Success} />
  
  </Content>
  </Layout>
  </Provider>
  
  </Router>
  
  )

ReactDOM.render(
  routing
 ,
  document.getElementById("root"),
);


// ReactDOM.render(
//   <ProductMain/>
//  ,
//   document.getElementById("root"),
// );




// ReactDOM.render(
//   <div className="App">
//     <h1>antd version: {version}</h1>
//     <DatePicker />
//     <Button type="primary" style={{ marginLeft: 8 }}>
//       Primary Button
//     </Button>
//   </div>,
//   document.getElementById("root")
// );
