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
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import AddIcon from '@material-ui/icons/Add';
import { Label, NoEncryption, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { Icon, IconButton } from "@material-ui/core";
import axios from 'axios'
import { preProcessFile } from "typescript";

export default function EmployeesTable(props) {
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
  const inputStyle = {
    borderStyle: "hidden hidden solid hidden", 
    'font-size': "20px"
  }
  const classes = useStyles();
  const [maNV,setMaNV] = useState('');
  const [HoVT,setHT] = useState('');
  const [DateOfBirth,setDB] = useState('');
  const [QueQuan,setQQ] = useState('');
  const [Luong,setLuong] = useState('');
  const [MaVT,setVT] = useState('');
  const [DateOfJoin,setDJ] = useState('');
  const [HanHD,setHHD] = useState('');
  const [TT,setTT] = useState('');
  const [Links,setLinks] = useState('');
  const [CMND,setCMND] = useState('');
  const [TK,setTK] = useState('');
  const [Q,setQ] = useState('');
  const [MK,setMK] = useState('');
  const [lastName,setLastName] = useState();
  const EmployeesInfo = {'MaNV':maNV,'lastName':lastName,'HoVT':HoVT,'DateOfBirth':DateOfBirth,'QueQuan':QueQuan,'Luong':Luong,'MaVT':MaVT,'DateOfJoin':DateOfJoin,'HanHD':HanHD,'TT':TT,'Link':Link,'CMND':CMND,'TK':TK,'MK':MK,'Q':Q};
  const { tableHead, tableData, tableHeaderColor ,token} = props;
  classTableEmployess = classes.table;
  async function clickDelete(e,prop){
    const res = await axios({
      method: 'delete',
      url: "https://mighty-plains-90447.herokuapp.com/v1/employee/delete",
      headers:{
        'Encytpe': 'application/json',
        "Authorization": 'Bearer ' + token
      },
      data:{
        ids: [prop[0]]
      }
    }).catch(function(err){
      alert(err)
    });
    document.location.reload();
  }

  async function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    e.preventDefault();
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: initial');
    const res = await axios({
      method: 'post',
      url: "https://mighty-plains-90447.herokuapp.com/v1/employee/getbyid",
      headers:{
        'Encytpe': 'application/json',
        "Authorization": 'Bearer ' + token,
      },
      data: {
         id: prop[0]
      }
    });
    setMaNV(res.data['id']);
    setHT(res.data['firstName']);
    setLastName(res.data['lastName']); 
    setDB(res.data['birthday']); 
    setQQ(res.data['address']);
    setVT(res.data['position']);
    setHHD(res.data['expireDate']);
    setCMND(res.data['cccd']);
    setTT(res.data['isActive'].toString());
    setTK(res.data['account']);
    setLuong(res.data['salary']);
    setQ(res.data['roleCode']);
    setDJ(res.data['joinDate']);
    setLinks(prop[5])
    }

    function clickAddStaff(){
    //alert(classTableEmployess)
    //alert(document.getElementsByClassName(classTableEmployess)[0]);
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: initial');
    }

    function clickReturnToList(){
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:initial');
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: none');
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: none');
    }

    function handleChangeInputTag(e,func){
      e.preventDefault();
      func(e.target.value);
    }

    async function handleSubmit(e,id){
      e.preventDefault();
      var _form = document.getElementById(id);
      var _data = new FormData(_form);
      if(id == '1'){
      const res = await axios({
        method: 'put',
        url: "https://mighty-plains-90447.herokuapp.com/v1/employee/createone",
        headers:{
          'Encytpe': 'multipart/form-data',
          "Authorization": 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: _data
      }).then(function(res){
        alert('Submit Success');
        return res;
      }
      ).catch(function(err){
        alert(err)
      });
    }
    else if(id == '2'){
      const res = await axios({
        method: 'put',
        url: "https://mighty-plains-90447.herokuapp.com/v1/employee/update",
        headers:{
          'Encytpe': 'multipart/form-data',
          "Authorization": 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: _data
      }).then(function(res){
        alert('Submit Success');
        return res;
      }
      ).catch(function(err){
        alert(err)
      });
    }
    }
    function fixInfo(e,id){
        document.getElementById(id).removeAttribute('disabled');
    }
    return (
    <div className={classes.tableResponsive}>
    <div class='FormEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='1' onSubmit={(e)=>{handleSubmit(e,'1')}}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder="Tên" size={45}  style={inputStyle} type="text" name = 'firstName' valur = {HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder="Tên đệm" size={45}  style={inputStyle} type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input type="text" name = 'birthday' placeholder="Ngày sinh: dd-mm-yy" size={45}  style={inputStyle} value={DateOfBirth}   onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Quê Quán' size={45}  style={inputStyle} type="text" name = 'address' value = {QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Lương' size={45}  style={inputStyle} type="number" name = 'salary' value = {Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Vị trí' size={45}  style={inputStyle} type="text" name = 'position' value = {MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input size={45}  style={inputStyle} type="text" name = 'joinDate' placeholder="Ngày tham gia: dd-mm-yy" value ={DateOfJoin} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input  size={45}  style={inputStyle} type="text" name = 'expireDate' placeholder="Ngày hết hạn hợp đồng: dd-mm-yy" value = {HanHD} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Tình trạng: true(false)' size={45}  style={inputStyle} type="text" name = 'isActive' value={TT} onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='CCCD' size={45}  style={inputStyle} type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Account' size={45}  style={inputStyle} type="text" name = 'account' value={TK} onChange={(e)=>{handleChangeInputTag(e,setTK)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input placeholder='Password' size={45}  style={inputStyle} type="text" name = 'password' value={MK} onChange={(e)=>{handleChangeInputTag(e,setMK)}}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                <input size={45}  style={inputStyle} type="file" name = 'avatar'/>
            </GridItem>
            </GridContainer>
            <input type="number" name = 'roleCode' value={1} style={{display: 'none'}}/>
            <br/>
            <input type="Submit" value='Submit'/>
        </form>
    </div>
    <div class='FormFixEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='2' onSubmit={(e)=>{handleSubmit(e,'2')}}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Mã nhân viên:
                <input id ="id" disabled="disabled" size={45}  style={inputStyle} type="text" name = 'id' value={maNV}/>
                <Button onClick={(e)=>fixInfo(e,"id")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tên: 
                <input id="firstName" disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'firstName' value={HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
                <Button onClick={(e)=>fixInfo(e,"firstName")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tên đệm:
                <input id="lastName" disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
                <Button onClick={(e)=>fixInfo(e,"lastName")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày sinh:
                <input id="dateBirth" disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'birthday' value={DateOfBirth.split('-')[2]+'-'+DateOfBirth.split('-')[1]+'-'+DateOfBirth.split('-')[0]}  onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
                <Button onClick={(e)=>fixInfo(e,"dateBirth")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Quê Quán:
                <input id ="QQ" disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'address' value={QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
                <Button onClick={(e)=>fixInfo(e,"QQ")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Lương: 
                <input id="luong" disabled="disabled"  size={45}  style={inputStyle} type="number" name = 'salary' value={Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
                <Button onClick={(e)=>fixInfo(e,"luong")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Vị trí:
                <input id="position" disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'position' value={MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
                <Button onClick={(e)=>fixInfo(e,"position")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                Ngày tham gia:
                <br/>
                <input id='joinDate' disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'joinDate' value={DateOfJoin.split('-')[2]+'-'+DateOfJoin.split('-')[1]+'-'+DateOfJoin.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
                <Button onClick={(e)=>fixInfo(e,"joinDate")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Ngày hết hạn hợp đồng:
                <input id='ed' disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'expireDate' value={HanHD.split('-')[2]+'-'+HanHD.split('-')[1]+'-'+HanHD.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
                <Button onClick={(e)=>fixInfo(e,"ed")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tình trạng:
                <input id='tt' disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'isActive' value={TT}  onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
                <Button onClick={(e)=>fixInfo(e,"tt")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                CCCD:
                <input id='cccd' disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
                <Button onClick={(e)=>fixInfo(e,"cccd")} ><BorderColorIcon/></Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Quyền:
                <input id='role' disabled="disabled"  size={45}  style={inputStyle} type="number" name = 'roleCode' value={Q}/>
                <Button onClick={(e)=>fixInfo(e,"role")} ><BorderColorIcon/></Button>
            </GridItem>  
            <GridItem xs={12} sm={12} md={5}>
                <br/>
                Tài khoản:
                <input id='tk' disabled="disabled"  size={45}  style={inputStyle} type="text" name = 'account' value={TK}/>
                <Button onClick={(e)=>fixInfo(e,"tk")} ><BorderColorIcon/></Button>
            </GridItem>
          </GridContainer>
          <br/>
          Ảnh:
          <img src = {Links} width="200" height="200"></img>
          <br/>
          <input id='anh' disabled="disabled"  size={45}  style={inputStyle} type="file" name = 'avatar'/>
          <Button onClick={(e)=>fixInfo(e,"anh")} ><BorderColorIcon/></Button>
          <br/>
          <input type="Submit" value='Submit'/>
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
                  if (key != 5){
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>  
                  );
                  }else{
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        <img src={prop} width="150" height="150"></img>
                      </TableCell>  
                    );
                  }
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

EmployeesTable.defaultProps = {
  tableHeaderColor: "gray"
};

EmployeesTable.propTypes = {
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



