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


export default function BillsTable(props) {
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
  const classes = useStyles();
  const [maNV,setMaNV] = useState('');
  const [maDH,setMaDH] = useState('');
  const [ngayTao,setNT] = useState('');
  const [giaTri,setGT] = useState('');
  const [tenKH,setTKH] = useState('');
  const [sdt,setSDT] = useState('');
  const [ghichu,setGC] = useState('');
  const [TT,setTT] = useState('');
  const BillsInfo = {'MaNV':maNV,'MaDH':maDH,'ngayTao':ngayTao,'GiaTri':giaTri,'tenKH':tenKH,'sdt':sdt,'GhiChu':ghichu,'TT':TT};
  const { tableHead, tableData, tableHeaderColor } = props;
  classTableEmployess = classes.table;
  function clickDelete(e,prop){
    alert(prop); //prop[0],prop[1],....
    document.location.reload();
  }

  function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('BillFixForm')[0].setAttribute('style','display: initial');
    setMaDH(prop[0]);
    setMaNV(prop[1]);
    setNT(prop[2]);
    setGT(prop[3]);
    setTKH(prop[4]);
    setSDT(prop[5]);
    setGC(prop[6]);
    setTT(prop[7]);
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
    BillsInfo[key] = e.target.value;
    e.preventDefault();
    }

    function handleSubmit(e){
    alert(BillsInfo['ngayTao'])
    e.preventDefault();
    }
    return (
    <div className={classes.tableResponsive}>
    <div class='BillForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e)}}>
            <label>
                Mã đơn hàng:
                <br/>
                <input type="text"   onChange={(e)=>{handleChangeInputTag(e,'MaDH')}}/>
            </label>
            <br/>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Ngày tạo:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'ngayTao')}}/>
            </label>
            <br/>
            <label>
                Giá trị:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'GiaTri')}}/>
            </label>
            <br/>
            <label>
                Tên khách hàng:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
            </label>
            <br/>
            <label>
                SDT:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'sdt')}}/>
            </label>
            <br/>
            <label>
                Ghi chú: 
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
            </label>
            <br/>
            <label>
                Trạng thái:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'TT')}}/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    </div>
    <div class='BillFixForm' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e)}}>
            <label>
                Mã đơn hàng:
                <br/>
                <input type="text" placeholder={maDH}   onChange={(e)=>{handleChangeInputTag(e,'MaDH')}}/>
            </label>
            <br/>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text" placeholder={maNV} onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Ngày tạo:
                <br/>
                <input type="date"  placeholder={ngayTao} onChange={(e)=>{handleChangeInputTag(e,'ngayTao')}}/>
            </label>
            <br/>
            <label>
                Giá trị:
                <br/>
                <input type="number" placeholder={giaTri} onChange={(e)=>{handleChangeInputTag(e,'GiaTri')}}/>
            </label>
            <br/>
            <label>
                Tên khách hàng:
                <br/>
                <input type="text"  placeholder={tenKH} onChange={(e)=>{handleChangeInputTag(e,'tenKH')}}/>
            </label>
            <br/>
            <label>
                SDT:
                <br/>
                <input type="number"  placeholder={sdt} onChange={(e)=>{handleChangeInputTag(e,'sdt')}}/>
            </label>
            <br/>
            <label>
                Ghi chú: 
                <br/>
                <input type="text"  placeholder={ghichu} onChange={(e)=>{handleChangeInputTag(e,'GhiChu')}}/>
            </label>
            <br/>
            <label>
                Trạng thái:
                <br/>
                <input type="text"  placeholder={TT} onChange={(e)=>{handleChangeInputTag(e,'TT')}}/>
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