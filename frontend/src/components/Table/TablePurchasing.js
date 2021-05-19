import React, { useState } from "react";
import PropTypes from "prop-types";
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
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'

export default function PurchasingTable(props) {
    const useStyles = makeStyles(styles);
    var classTablePurchasing;
    var recordPurchasing;
    const classes = useStyles();
    const [maSP,setMaSp] = useState('');
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [isActive,setIsActive] = useState('');
    const [Link,setLink] = useState('');

    const PurchasingInfo = {'maSP': maSP,'name':name,'price':'price', 'description':description,'isActive':isActive};
    const { tableHead, tableData, tableHeaderColor ,token} = props;
    classTablePurchasing = classes.table;

    async function clickDelete(e,prop){
        const dl = prop[0];
        const res = await axios({
            method: 'delete',
            url: "https://mighty-plains-90447.herokuapp.com/v1/product/delete",
            headers:{
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data:{
                ids: [dl],
            }
        }).catch(function(err){
            alert(err)
        });
        document.location.reload();
    }

    async function clickFix(e,prop){
        e.preventDefault();
        document.getElementsByClassName(classTablePurchasing)[0].setAttribute('style','display:none');
        document.getElementsByClassName('FormFixPurchasing')[0].setAttribute('style','display: initial');
        axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/product/getbyid",
            headers:{
                // 'Encytpe': 'application/json',
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                id: prop[0]
            }
        }).then(function(res){
            setMaSp(res.data['id']);
            setName(res.data['name']);
            setPrice(res.data['price']);
            setDescription(res.data['description']);
            setIsActive(res.data['isActive'].toString());

        }).catch(function(err){
            alert(err)
        });
    }

    function clickAddStaff(){
        document.getElementsByClassName(classTablePurchasing)[0].setAttribute('style','display:none');
        document.getElementsByClassName('FormAddPurchasing')[0].setAttribute('style','display: initial');
    }

    function clickReturnToList(){
        document.getElementsByClassName(classTablePurchasing)[0].setAttribute('style','display:initial');
        document.getElementsByClassName('FormAddPurchasing')[0].setAttribute('style','display: none');
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
                url: "https://mighty-plains-90447.herokuapp.com/v1/product/createone",
                headers:{
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data:  {
                    name: _data.get('name'),
                    price: _data.get('price'),
                    description: _data.get('description'),
                    isActive: _data.get('isActive')
                }
            }).then(function(res){
                    alert('Add Purchasingeji Success');
                    return res;
                }
            ).catch(function(err){
                alert(err)
            });
        }
        else if(id == '2'){
            const res = await axios({
                method: 'put',
                url: "https://mighty-plains-90447.herokuapp.com/v1/product/update",
                headers:{
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data:  {
                    id: _data.get('id'),
                    name: _data.get('name'),
                    price: _data.get('price'),
                    description: _data.get('description'),
                    isActive: _data.get('isActive')
                }
            }).then(function(res){
                    alert('Update Purchasing Success');
                    return res;
                }
            ).catch(function(err){
                alert(err)
            });
        }
    }
    return (
        <div className={classes.tableResponsive}>
            <div class='FormAddPurchasing' style={{display:'none'}}>
                <Button onClick={clickReturnToList}>Back</Button>
                <form id='1' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'1')}}>
                    <label>
                        Ten nguyen lieu
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Nha cung cap
                        <br/>
                        <input type="number" name = 'price' value={price}  onChange={(e)=>{handleChangeInputTag(e,setPrice)}}/>
                    </label>
                    <br/>

                    <label>
                        So luong
                        <br/>
                        <input type="text" name = 'description' value={description} onChange={(e)=>{handleChangeInputTag(e,setDescription)}}/>
                    </label>
                    <br/>
                    <label>
                        Don gia (VND)
                        <br/>
                        <input type="text" name = 'isActive' value={isActive} onChange={(e)=>{handleChangeInputTag(e,setIsActive)}}/>
                    </label>
                    <br/>
                    <label>
                        Don vi
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Chi phi (VND)
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Chi tiet
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>

                    <br/>
                    <input type="Submit" value='Submit'/>
                </form>
            </div>
            <div class='FormFixPurchasing' style={{display:'none'}}>
                <Button onClick={clickReturnToList}>Back</Button>
                <form id='2' style={{textAlign: 'center'}} onSubmit={(e)=>{handleSubmit(e,'2')}}>
                    <label>
                        Ten nguyen lieu
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Nha cung cap
                        <br/>
                        <input type="number" name = 'price' value={price}  onChange={(e)=>{handleChangeInputTag(e,setPrice)}}/>
                    </label>
                    <br/>

                    <label>
                        So luong
                        <br/>
                        <input type="text" name = 'description' value={description} onChange={(e)=>{handleChangeInputTag(e,setDescription)}}/>
                    </label>
                    <br/>
                    <label>
                        Don gia (VND)
                        <br/>
                        <input type="text" name = 'isActive' value={isActive} onChange={(e)=>{handleChangeInputTag(e,setIsActive)}}/>
                    </label>
                    <br/>
                    <label>
                        Don vi
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Chi phi (VND)
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
                    </label>
                    <br/>
                    <label>
                        Chi tiet
                        <br/>
                        <input type="text" name = 'name' value = {name}  onChange={(e)=>{handleChangeInputTag(e,setName)}}/>
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
                                        <Button id='fix' onClick={(e)=>clickFix(e,prop)} ><BorderColorIcon/></Button>
                                        <Button id='delete' onClick={(e)=>clickDelete(e,prop)}><DeleteIcon/></Button>
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

PurchasingTable.defaultProps = {
    tableHeaderColor: "gray"
};

PurchasingTable.propTypes = {
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



