import React, { useState } from "react";
import PropTypes from "prop-types";
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
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import AddIcon from '@material-ui/icons/Add';
import { Label, NoEncryption, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { Icon, IconButton } from "@material-ui/core";
import axios from 'axios';

export default function BillsTable(props) {
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
  const classes = useStyles();
  var tmp = {'MaNV':'','MaDH':'','ngayTao':'','GiaTri':'','tenKH':'','GhiChu':'','sdt':'','TT':'','products':[]};
  const [BillsInfo,setBills] = useState(tmp)
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

  function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('BillFixForm')[0].setAttribute('style','display: initial');
    tmp['MaDH']=prop[0];
    tmp['MaNV']=prop[1];
    tmp['ngayTao'] = prop[2];
    tmp['GiaTri'] = prop[3];
    tmp['tenKH'] = prop[4];
    tmp['GhiChu'] = prop[5]
    setBills(tmp);
    e.preventDefault();
    
    }

    function clickAddStaff(){
    //alert(classTableEmployess)
    //alert(document.getElementsByClassName(classTableEmployess)[0]);
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('BillForm')[0].setAttribute('style','display: initial');
    }

    function clickReturnToList(){
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:initial');
    document.getElementsByClassName('BillForm')[0].setAttribute('style','display: none');
    document.getElementsByClassName('BillFixForm')[0].setAttribute('style','display: none');
    document.location.reload();
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
    if(id == 'BillFixForm'){
      const res = await axios({
        url: "https://mighty-plains-90447.herokuapp.com/v1/order/update",
        method:"put",
        headers:{
          "Authorization": 'Bearer ' + token
        },
        data:{
          "id": BillsInfo['MaDH'], 
	        "updateAt": "05-01-2009 21:34:23",//BillsInfo['ngayTao'],
	        "importerId":BillsInfo['MaNV'],
	        "note":BillsInfo['GhiChu'],
	        "money": BillsInfo['GiaTri'],
	        "tableCode":1,
	        "orderProducts": BillsInfo['products']
        }
    }).then(res=>{
      document.location.reload();
    }).catch(err=>{
      alert(err);
    });
    }else{
      const res = await axios({
        url: "https://mighty-plains-90447.herokuapp.com/v1/order/createone",
        method:"put",
        headers:{
          "Authorization": 'Bearer ' + token,
          "Encytpe": "application/json"
        },
        data:{
	        "updateAt": "05-01-2009 21:34:23",//BillsInfo['ngayTao'],
	        "importerId":BillsInfo['MaNV'],
	        "note":BillsInfo['GhiChu'],
	        "money": parseInt(BillsInfo['GiaTri']),
	        "tableCode":1,
	        "orderProducts": BillsInfo['products']
        }
    }).then(res=>{
      document.location.reload();
    }).catch(err=>{
      alert(err);
    });
    }
    }
    return (
    <div className={classes.tableResponsive}>
    <div class='BillForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='BillForm' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'BillForm')}}>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text"  value={BillsInfo['MaNV']} onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Ngày tạo:
                <br/>
                <input type="date"  value={BillsInfo['ngayTao']} onChange={(e)=>{handleChangeInputTag(e,'ngayTao')}}/>
            </label>
            <br/>
            <label>
                Giá trị:
                <br/>
                <input type="number"  value={BillsInfo['GiaTri']} onChange={(e)=>{handleChangeInputTag(e,'GiaTri')}}/>
            </label>
            <br/>
            <label>
                Tên khách hàng:
                <br/>
                <input type="text"  value={BillsInfo['tenKH']} onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
            </label>
            <br/>
            <label>
                Ghi chú: 
                <br/>
                <input type="text" value={BillsInfo['GhiChu']} onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
            </label>
            <br/>
            <label>
                Products: MaSP(1)/SL,MaSP(2)/SL,...
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'products')}}/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    </div>
    <div class='BillFixForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='BillFixForm' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'BillFixForm')}}>
            <label>
                Mã đơn hàng:
                <br/>
                <input type="text" placeholder={BillsInfo['MaDH']}   onChange={(e)=>{handleChangeInputTag(e,'MaDH')}}/>
            </label>
            <br/>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text" placeholder={BillsInfo['MaNV']} onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Ngày tạo:
                <br/>
                <input type="date"  placeholder={BillsInfo['ngayTao']} onChange={(e)=>{handleChangeInputTag(e,'ngayTao')}}/>
            </label>
            <br/>
            <label>
                Giá trị:
                <br/>
                <input type="number" placeholder={BillsInfo['GiaTri']} onChange={(e)=>{handleChangeInputTag(e,'GiaTri')}}/>
            </label>
            <br/>
            <label>
                Tên khách hàng:
                <br/>
                <input type="text"  placeholder={BillsInfo['tenKH']} onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
            </label>
            <br/>
            <label>
                Ghi chú: 
                <br/>
                <input type="text"  placeholder={BillsInfo['GhiChu']} onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
            </label>
            <br/>
            <label>
                Products: MaSP(1)/SL,MaSP(2)/SL,...
                <br/>
                <input type="text"  placeholder={BillsInfo['products']} onChange={(e)=>{handleChangeInputTag(e,'products')}}/>
            </label>
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