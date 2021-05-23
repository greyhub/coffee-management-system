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
import axios from 'axios'
import { preProcessFile } from "typescript";

export default function EmployeesTable(props) {
  const useStyles = makeStyles(styles);
  var classTableEmployess;
  var recordEmployess;
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
  const [Link,setLink] = useState('');
  const [CMND,setCMND] = useState('');
  const [TK,setTK] = useState('');
  const [Q,setQ] = useState('');
  const [MK,setMK] = useState(0);
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
    }).then(res=>{
      document.location.reload();
    }).catch(function(err){
      alert(err)
    });
  }

  async function clickFix(e,prop){
    //alert(prop); //prop[0],prop[1],....
    e.preventDefault();
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none');
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: initial');
    await axios({
      method: 'post',
      url: "https://mighty-plains-90447.herokuapp.com/v1/employee/getbyid",
      headers:{
        'Encytpe': 'application/json',
        "Authorization": 'Bearer ' + token,
      },
      data: {
         id: prop[0]
      }
    }).then(function(res){
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
    }).catch(function(err){
      alert(err)
    });
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
    document.location.reload();
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
    return (
    <div className={classes.tableResponsive}>
    <div class='FormEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='1' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'1')}}>
            <label>
                FirstName:
                <br/>
                <input type="text" name = 'firstName' value = {HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
            </label>
            <br/>
            <label>
                LastName:
                <br/>
                <input type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
            </label>
            <br/>
            <label>
                Date Of Birth:
                <br/>
                <input type="text" name = 'birthday' placeholder="dd-mm-yy(2 số sau mỗi -)" value={DateOfBirth}   onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
            </label>
            <br/>
            <label>
                Address:
                <br/>
                <input type="text" name = 'address' value = {QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
            </label>
            <br/>
            <label>
                Slary:
                <br/>
                <input type="number" name = 'salary' value = {Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
            </label>
            <br/>
            <label>
                Position:
                <br/>
                <input type="text" name = 'position' value = {MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
            </label>
            <br/>
            <label>
                Joined Date:
                <br/>
                <input type="text" name = 'joinDate' placeholder="dd-mm-yy(2 số sau mỗi -)" value ={DateOfJoin} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
            </label>
            <br/>
            <label>
                Expried Date:
                <br/>
                <input type="text" name = 'expireDate' placeholder="dd-mm-yy(2 số sau mỗi -)" value = {HanHD} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
            </label>
            <br/>
            <label>
                Active:
                <br/>
                <input type="text" name = 'isActive' value={TT} onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
            </label>
            <br/>
            <label>
                Picture:
                <br/>
                <input type="file" name = 'avatar' value={Link} onChange={(e)=>{handleChangeInputTag(e,setLink)}}/>
            </label>
            <br/>
            <label>
                CCCD:
                <br/>
                <input type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
            </label>
            <br/>
            <label>
                Role:
                <br/>
                <input type="number" name = 'roleCode' value={1}/>
            </label>
            <br/>
            <label>
                Account:
                <br/>
                <input type="text" name = 'account' value={TK} onChange={(e)=>{handleChangeInputTag(e,setTK)}}/>
            </label>
            <br/>
            <label>
                Password:
                <br/>
                <input type="text" name = 'password' value={MK} onChange={(e)=>{handleChangeInputTag(e,setMK)}}/>
            </label>
            <br/>
            <input type="Submit" value='Submit'/>
        </form>
    </div>
    <div class='FormFixEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form id='2' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'2')}}>
            <label>
                ID:
                <br/>
                <input type="text" name = 'id' value={maNV}/>
            </label>
            <br/>
            <label>
                FirstName:
                <br/>
                <input type="text" name = 'firstName' value={HoVT}  onChange={(e)=>{handleChangeInputTag(e,setHT)}}/>
            </label>
            <br/>
            <label>
                LastName:
                <br/>
                <input type="text" name = 'lastName' value={lastName}  onChange={(e)=>{handleChangeInputTag(e,setLastName)}}/>
            </label>
            <br/>
            <label>
                Date Of Birth:
                <br/>
                <input type="text" name = 'birthday' value={DateOfBirth.split('-')[2]+'-'+DateOfBirth.split('-')[1]+'-'+DateOfBirth.split('-')[0]}  onChange={(e)=>{handleChangeInputTag(e,setDB)}}/>
            </label>
            <br/>
            <label>
                Address:
                <br/>
                <input type="text" name = 'address' value={QueQuan}  onChange={(e)=>{handleChangeInputTag(e,setQQ)}}/>
            </label>
            <br/>
            <label>
                Slary:
                <br/>
                <input type="number" name = 'salary' value={Luong}  onChange={(e)=>{handleChangeInputTag(e,setLuong)}}/>
            </label>
            <br/>
            <label>
                Position:
                <br/>
                <input type="text" name = 'position' value={MaVT}  onChange={(e)=>{handleChangeInputTag(e,setVT)}}/>
            </label>
            <br/>
            <label>
                Joined Date:
                <br/>
                <input type="text" name = 'joinDate' value={DateOfJoin.split('-')[2]+'-'+DateOfJoin.split('-')[1]+'-'+DateOfJoin.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setDJ)}}/>
            </label>
            <br/>
            <label>
                Expried Date:
                <br/>
                <input type="text" name = 'expireDate' value={HanHD.split('-')[2]+'-'+HanHD.split('-')[1]+'-'+HanHD.split('-')[0]} onChange={(e)=>{handleChangeInputTag(e,setHHD)}}/>
            </label>
            <br/>
            <label>
                Active:
                <br/>
                <input type="text" name = 'isActive' value={TT}  onChange={(e)=>{handleChangeInputTag(e,setTT)}}/>
            </label>
            <br/>
            <label>
                Picture:
                <br/>
                <input type="file" name = 'avatar'/>
            </label>
            <br/>
            <label>
                CCCD:
                <br/>
                <input type="text" name = 'cccd' value={CMND} onChange={(e)=>{handleChangeInputTag(e,setCMND)}}/>
            </label>
            <br/>
            <label>
                Role:
                <br/>
                <input type="number" name = 'roleCode' value={Q}/>
            </label>
            <br/>    
            <label>
                Account:
                <br/>
                <input type="text" name = 'account' value={TK}/>
            </label>
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



