import React from "react";
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

const useStyles = makeStyles(styles);
var classTableEmployess;
var EmployeesInfo = {'MaNV':' ','HoVT':' ','DateOfBirth':' ','QueQuan':' ','Luong':' ','MaVT':' ','DateOfJoin':' ','HanHD':' ','TT':' ','Link':' ','CMND':' ','BHXH':' '}
var recordEmployess
function clickDelete(prop){
    alert(prop); //prop[0],prop[1],....
    document.location.reload();
}

function clickFix(prop){
    //alert(prop); //prop[0],prop[1],....
    EmployeesInfo['MaNV'] = prop[0]
    EmployeesInfo['HoVT'] = prop[1]
    EmployeesInfo['DateOfBirth'] = prop[2]
    EmployeesInfo['QueQuan'] = prop[3]
    EmployeesInfo['Luong'] = prop[4]
    EmployeesInfo['MaVT'] = prop[5]
    EmployeesInfo['TT'] = prop[6]
    alert(EmployeesInfo['MaNV'])
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none')
    document.getElementsByClassName('FormFixEmployees')[0].setAttribute('style','display: initial')
    
}

function clickAddStaff(){
    //alert(classTableEmployess)
    //alert(document.getElementsByClassName(classTableEmployess)[0]);
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:none')
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: initial')
}

function clickReturnToList(){
    document.getElementsByClassName(classTableEmployess)[0].setAttribute('style','display:initial')
    document.getElementsByClassName('FormEmployees')[0].setAttribute('style','display: none')
    document.location.reload();
}

function handleChangeInputTag(e,key){
    EmployeesInfo[key] = e.target.value;
}

function handleSubmit(e){
    alert(EmployeesInfo['DateOfBirth'])
    e.preventDefault();
}

export default function EmployeesTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  classTableEmployess = classes.table;
  return (
    <div className={classes.tableResponsive}>
    <div class='FormEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e)}}>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text"   onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Họ tên nhân viên:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'HoVT')}}/>
            </label>
            <br/>
            <label>
                Ngày sinh:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'DateOfBirth')}}/>
            </label>
            <br/>
            <label>
                Quê Quán:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'QueQuan')}}/>
            </label>
            <br/>
            <label>
                Lương:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'Luong')}}/>
            </label>
            <br/>
            <label>
                Mã VT:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'MaVT')}}/>
            </label>
            <br/>
            <label>
                Ngày gia nhập:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'DateOfJoin')}}/>
            </label>
            <br/>
            <label>
                Hạn HD:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'HanHD')}}/>
            </label>
            <br/>
            <label>
                Tình trạng:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'TT')}}/>
            </label>
            <br/>
            <label>
                Link ảnh:
                <br/>
                <input type="url"  onChange={(e)=>{handleChangeInputTag(e,'Link')}}/>
            </label>
            <br/>
            <label>
                CMND:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'CMND')}}/>
            </label>
            <br/>
            <label>
                BHXH:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'BHXH')}}/>
            </label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    </div>
    <div class='FormFixEmployees' style={{display:'none'}}>
        <Button onClick={clickReturnToList}>Back</Button>
        <form style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e)}}>
            <label>
                Mã nhân viên:
                <br/>
                <input type="text"  value={EmployeesInfo.MaNV} onChange={(e)=>{handleChangeInputTag(e,'MaNV')}}/>
            </label>
            <br/>
            <label>
                Họ tên nhân viên:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'HoVT')}}/>
            </label>
            <br/>
            <label>
                Ngày sinh:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'DateOfBirth')}}/>
            </label>
            <br/>
            <label>
                Quê Quán:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'QueQuan')}}/>
            </label>
            <br/>
            <label>
                Lương:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'Luong')}}/>
            </label>
            <br/>
            <label>
                Mã VT:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'MaVT')}}/>
            </label>
            <br/>
            <label>
                Ngày gia nhập:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'DateOfJoin')}}/>
            </label>
            <br/>
            <label>
                Hạn HD:
                <br/>
                <input type="date"  onChange={(e)=>{handleChangeInputTag(e,'HanHD')}}/>
            </label>
            <br/>
            <label>
                Tình trạng:
                <br/>
                <input type="text"  onChange={(e)=>{handleChangeInputTag(e,'TT')}}/>
            </label>
            <br/>
            <label>
                Link ảnh:
                <br/>
                <input type="url"  onChange={(e)=>{handleChangeInputTag(e,'Link')}}/>
            </label>
            <br/>
            <label>
                CMND:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'CMND')}}/>
            </label>
            <br/>
            <label>
                BHXH:
                <br/>
                <input type="number"  onChange={(e)=>{handleChangeInputTag(e,'BHXH')}}/>
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
                    <Button id='delete' onClick={()=>clickDelete(prop)}><DeleteIcon/></Button> 
                    <Button id='fix' onClick={()=>clickFix(prop)} ><BorderColorIcon/></Button>
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



