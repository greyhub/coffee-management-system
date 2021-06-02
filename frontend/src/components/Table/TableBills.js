import React, { useState } from "react";
import PropTypes, { array } from "prop-types";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button} from 'react-bootstrap';
// core components
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import AddIcon from '@material-ui/icons/Add';
import { Label, NoEncryption, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { Icon, IconButton } from "@material-ui/core";
import axios from 'axios';
import CardBody from "components/Card/CardBody";

export default function BillsTable(props) {
  const inputStyle = {
    borderStyle: "hidden hidden solid hidden", 
    'font-size': "20px"
  }
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
  const classes = useStyles();
  var tmp = {'MaNV':'','MaDH':'','ngayTao':'','GiaTri': 0,'tenKH':'','GhiChu':'','sdt':'','TT':'','products':[]};
  const [prevForm,setPrevForm] = useState();
  const [BillsInfo,setBills] = useState(tmp)
  const [products,setProducts] = useState([]);
  const { tableHead, tableData, tableHeaderColor,token } = props;
  classTableEmployess = classes.table;
  async function clickDelete(e,prop){
    e.preventDefault();
    const res = await axios({
        url: "https://mighty-plains-90447.herokuapp.com/v1/order/delete",
        method:"delete",
        headers:{
          "Authorization": 'Bearer ' + token
        },
        data:{
          ids: [prop[0]]
        }
    }).then(res=>{
      document.location.reload();
    }).catch(err=>{
      alert(err);
    })
  }

  async function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('BillFixForm')[0].setAttribute('style','display: initial');
    const res = await axios({
      url: 'https://mighty-plains-90447.herokuapp.com/v1/order/getbyid',
      method: "post",
      headers: {
        "Authorization": 'Bearer ' + token
      },
      data:{
        id: prop[0]
      }
    })
    tmp['MaDH']=res.data['id'];
    tmp['ngayTao']=res.data['updateAt'];
    tmp['MaNV'] =res.data['employee']['id'];
    tmp['GiaTri'] = res.data['money'];
    tmp['tenKH'] = res.data['employee']['firstName'];
    tmp['GhiChu'] = res.data['note'];
    tmp['products']=res.data['orderProducts']
    if(tmp['products'].length==0){tmp['GiaTri']=0}
    setBills(tmp);
    e.preventDefault();
    }

    function clickAddStaff(){
    //alert(classTableEmployess)
    //alert(document.getElementsByClassName(classTableEmployess)[0]);
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('BillForm')[0].setAttribute('style','display: initial');
    setBills(tmp);
    }

    function clickReturnToList(){
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:initial');
    document.getElementsByClassName('BillForm')[0].setAttribute('style','display: none');
    document.getElementsByClassName('BillFixForm')[0].setAttribute('style','display: none');
    }

    function handleChangeInputTag(e,key){
      e.preventDefault();
      for(const i in BillsInfo){
         tmp[i] = BillsInfo[i];
      }
      if(key!='products'){
      tmp[key] = e.target.value;
      setBills(tmp);
      }else{
        var rows = e.target.value.split(',');
        tmp['products']=[];
        for(var i = 0;i<rows.length;i++){
          var columns = rows[i].split('/');
          tmp['products'].push({'product':columns[0],'count':parseInt(columns[1])});
      }
      setBills(tmp);
    }
  }

   async function handleSubmit(e,id){
    e.preventDefault();
    var currentDate = new Date();
    if(id == 'BillFixForm'){
      var oderProducts = [];
      for(var i = 0; i<BillsInfo['products'].length;i++){
          oderProducts.push({"product":BillsInfo['products'][i]['product']['id'],"count":BillsInfo['products'][i]['count']})
      }
      const res = await axios({
        url: "https://mighty-plains-90447.herokuapp.com/v1/order/update",
        method:"put",
        headers:{
          "Authorization": 'Bearer ' + token
        },
        data:{
          "id": BillsInfo['MaDH'], 
	        "updateAt":  String(currentDate.getDate()).padStart(2, '0') + '-' +String(currentDate.getMonth()).padStart(2, '0')+'-'+String(currentDate.getFullYear()).padStart(2, '0') + ' ' +String(currentDate.getHours()).padStart(2, '0')+':'+String(currentDate.getMinutes()).padStart(2, '0')+':'+String(currentDate.getSeconds()).padStart(2, '0') , //"05-01-2009 21:34:23"
	        "importerId":BillsInfo['MaNV'],
	        "note":BillsInfo['GhiChu'],
	        "money": BillsInfo['GiaTri'],
	        "tableCode":1,
	        "orderProducts": oderProducts
        }
    }).then(res=>{
      document.location.reload();
    }).catch(err=>{
      alert(err);
    });
    }else{
      var oderProducts = [];
      for(var i = 0; i<BillsInfo['products'].length;i++){
          oderProducts.push({"product":BillsInfo['products'][i]['product']['id'],"count":BillsInfo['products'][i]['count']})
      }
      const res = await axios({
        url: "https://mighty-plains-90447.herokuapp.com/v1/order/createone",
        method:"put",
        headers:{
          "Authorization": 'Bearer ' + token,
          "Encytpe": "application/json"
        },
        data:{
	        "updateAt": String(currentDate.getDate()).padStart(2, '0') + '-' +String(currentDate.getMonth()).padStart(2, '0')+'-'+String(currentDate.getFullYear()).padStart(2, '0') + ' ' +String(currentDate.getHours()).padStart(2, '0')+':'+String(currentDate.getMinutes()).padStart(2, '0')+':'+String(currentDate.getSeconds()).padStart(2, '0'),
	        "importerId":BillsInfo['MaNV'],
	        "note":BillsInfo['GhiChu'],
	        "money": parseInt(BillsInfo['GiaTri']),
	        "tableCode":1,
	        "orderProducts": oderProducts
        }
    }).then(res=>{
      document.location.reload();
    }).catch(err=>{
      alert(err);
    });
    }
    }
    function fixInfo(e,id_input){
       var inputTag = document.getElementById(id_input);
       inputTag.removeAttribute('disabled');
    }
    function caculatePrice(){
      var price = 0;
      for(var i =0 ; i < BillsInfo['products'].length;i++){
        price += BillsInfo['products'][i]['count']*BillsInfo['products'][i]['product']['price']
      }
      setBills({...BillsInfo,GiaTri: price});
    }
    function deleteGH(e,key){
      var tmpArray = BillsInfo['products'];
      tmpArray.splice(key,1);
      console.log(tmpArray);
      setBills({...BillsInfo, products: tmpArray});
      caculatePrice()
    }
    async function getProducts(e,className){
      e.preventDefault();
      document.getElementsByClassName(className)[0].setAttribute('style','display: none');
      document.getElementsByClassName(className)[0].setAttribute('style','display: none');
      document.getElementById('listProduct').setAttribute('style','display:initial')
      const res = await axios({
          url: 'https://mighty-plains-90447.herokuapp.com/v1/product',
          method: 'get',
          headers: {
            "Authorization": 'Bearer ' + token,
            "Encytpe": "application/json"
          }
      });
      setPrevForm(className);
      setProducts(res.data['products'])
    }
    function clickReturnToForm(){
      document.getElementById('listProduct').setAttribute('style','display:none');
      document.getElementsByClassName(prevForm)[0].setAttribute('style','display: initial');
    }
    function addItemCart(e,key){
        e.preventDefault();
        console.log(key);
        var tmp = BillsInfo['products']
        var check = 0;
        for(var i=0;i<tmp.length;i++){
          if(tmp[i]['product']['id'] == products[key]['id']){
            tmp[i]['count'] += 1;
            check = 1;
          }
        }
        if(check == 0 ){
          tmp.push({'product':products[key],'count':1})
        }
        setBills({...BillsInfo,products: tmp});
        caculatePrice();
    }
    return (
    <div className={classes.tableResponsive}>
    <div class='BillForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='BillForm' onSubmit={(e)=>{handleSubmit(e,'BillForm')}}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input type="text" placeholder="Mã nhân viên"  size={45}  style={inputStyle} value={BillsInfo['MaNV']} onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
               <br/>
                <input type="text" placeholder="Tên khách hàng" size={45} style={inputStyle} value={BillsInfo['tenKH']} onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input type="text" placeholder="Ghi chú" style={inputStyle} size ={45} value={BillsInfo['GhiChu']} onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
            </GridItem>
            </GridContainer>
            <br/>
            <label>
                <b>Giỏ hàng: Sản phẩm - Mã - Số lượng</b>
            </label>
            { BillsInfo['products'].map((oder,key) => {
                  return (
                    <div id = {'gh'+key}>
                      <Button onClick={(e)=>{deleteGH(e,key)}}>-</Button>
                      <label size={30}>{oder['product']['name']+' '+oder['product']['id']+' '+oder['count']}</label>
                      <br/>
                    </div>
                  );
            })}
            <br/>
            <Button onClick={(e)=>{getProducts(e,'BillForm')}}> Thêm sản phẩm </Button>
            <br/>
            <label> Giá trị: {BillsInfo['GiaTri']}</label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    </div>
    <div class='BillFixForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='BillFixForm'  onSubmit={(e)=>{handleSubmit(e,'BillFixForm')}}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Mã đơn hàng:
                <input class="input_MaDH" type="text" value={BillsInfo['MaDH']} size={45} style={inputStyle} disabled="disabled" onChange={(e)=>{handleChangeInputTag(e,'MaDH')}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Mã nhân viên:
                <input id="MaNV" type="text" value={BillsInfo['MaNV']} size={45} style={inputStyle} disabled="disabled" onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
                <Button onClick={(e)=>fixInfo(e,"MaNV")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày tạo:
                <input id='ngayTao' type="text" onfocus="this.type = 'date'"  value={new Date(BillsInfo['ngayTao'])} size={45} style={inputStyle} disabled="disabled" onChange={(e)=>{handleChangeInputTag(e,'ngayTao')}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tên khách hàng:
                <input id="tenKH" type="text" size={45} style={inputStyle} disabled="disabled"  value={BillsInfo['tenKH']} onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
                <Button onClick={(e)=>fixInfo(e,"tenKH")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                Ghi chú: 
                <input id="GC" size={45} style={inputStyle} disabled="disabled"  type="text"  placeholder={BillsInfo['GhiChu']} onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
                <Button onClick={(e)=>fixInfo(e,"GC")} ><BorderColorIcon/></Button>
            </GridItem>
            </GridContainer>
            <br/>
            <label>
                <b>Giỏ hàng: Sản phẩm - Mã - Số lượng</b>
            </label>
            { BillsInfo['products'].map((oder,key) => {
                  return (
                    <div id = {'gh'+key}>
                      <Button onClick={(e)=>{deleteGH(e,key)}}>-</Button>
                      <label size={30}>{oder['product']['name']+' '+oder['product']['id']+' '+oder['count']}</label>
                      <br/>
                    </div>
                  );
            })}
            <br/>
            <Button onClick={(e)=>{getProducts(e,'BillFixForm')}}>Thêm sản phẩm</Button>
            <br/>
            <label>Giá trị: {BillsInfo['GiaTri']}</label> 
            <br/>
            <input type="submit" value="Submit" />
        </form>
    </div>
    <div className={classes.table}><Button id='add' onClick={()=>clickAddStaff()}><AddIcon/></Button>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>  
                  );
                })}
                <TableCell>
                    <Button id='delete' onClick={(e)=>clickDelete(e,prop)}><DeleteIcon/></Button> 
                    <Button id='fix' onClick={(e)=>clickFix(e,prop)} ><BorderColorIcon/></Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    <div id='listProduct' style={{display: 'none'}}>
    <Button onClick={clickReturnToForm}>Back</Button>
      <GridContainer>
            {products.map((item,key)=>{
              return(
                <GridItem xs={12} sm={12} md={5}>
                      <label>ID: {item['id']}</label>
                      <br/>
                      <label>Tên: {item['name']}</label>
                      <br/>
                      <label>Giá: {item['price']}</label>
                      <br/>
                      <label>Tình trạng: {item['isActive'].toString()}</label>
                      <br/>
                      <img src={item['previewUri']} width="300" height="300"></img>
                      <br/>
                      <Button onClick={(e)=>{addItemCart(e,key)}}>+</Button> <label>Giỏ hàng: {BillsInfo['products'].map((product,key)=>{
                        if(item['id']==product['product']['id']){
                          return(
                            <label>{product['count']}</label>
                          );
                        }
                      })}</label>
                </GridItem>
              );
            })}
      </GridContainer>
    </div>
    </div>
  );
}

BillsTable.defaultProps = {
  tableHeaderColor: "gray"
};

BillsTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};