import React, {useState} from 'react'
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import { Button} from 'react-bootstrap';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import axios from 'axios';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from "components/Grid/GridItem.js";


export default function ItemsTable(props) {
    const useStyles = makeStyles(styles);
    var classTableItems;

    const inputStyle = {
        borderStyle: "hidden hidden solid hidden",
        'font-size': "18px"
    }
    const classes = useStyles();
    const [maSP, setMaSp] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState('');
    const {tableHead, tableData, tableHeaderColor, token} = props;
    classTableItems = classes.table;

    async function clickDelete(e, prop) {
        const dl = prop[0];
        const res = await axios({
            method: 'delete',
            url: "https://mighty-plains-90447.herokuapp.com/v1/product/delete",
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                ids: [dl],
            }
        }).catch(function (err) {
            alert(err)
        });
        document.location.reload();
    }

    async function clickFix(e, prop) {
        e.preventDefault();
        document.getElementsByClassName(classTableItems)[0].setAttribute('style', 'display:none');
        document.getElementsByClassName('FormFixItems')[0].setAttribute('style', 'display: initial');
        axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/product/getbyid",
            headers: {
                // 'Encytpe': 'application/json',
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                id: prop[0]
            }
        }).then(function (res) {
            setMaSp(res.data['id']);
            setName(res.data['name']);
            setPrice(res.data['price']);
            setDescription(res.data['description']);
            setIsActive(res.data['isActive'].toString());

        }).catch(function (err) {
            alert(err)
        });
    }

    async function clickFixImage(e, prop) {
        e.preventDefault();
        document.getElementsByClassName(classTableItems)[0].setAttribute('style', 'display:none');
        document.getElementsByClassName('FormFixImageItems')[0].setAttribute('style', 'display: initial');
        axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/product/getbyid",
            headers: {
                "Authorization": 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: {
                id: prop[0]
            }
        }).then(function (res) {
            setMaSp(res.data['id']);
        }).catch(function (err) {
            alert(err)
        });
    }

    function clickAddItems() {
        document.getElementsByClassName(classTableItems)[0].setAttribute('style', 'display:none');
        document.getElementsByClassName('FormAddItems')[0].setAttribute('style', 'display: initial');
        setMaSp('');
        setName('');
        setPrice('');
        setDescription('');
        setIsActive('');
    }

    function clickRestore(e, prop) {
    }

    function clickReturnToList() {
        document.getElementsByClassName(classTableItems)[0].setAttribute('style', 'display:initial');
        document.getElementsByClassName('FormAddItems')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('FormFixItems')[0].setAttribute('style', 'display: none');
        document.getElementsByClassName('FormFixImageItems')[0].setAttribute('style', 'display: none');
    }

    function handleChangeInputTag(e, func) {
        e.preventDefault();
        func(e.target.value);
    }

    async function handleSubmit(e, id) {
        e.preventDefault();
        var _form = document.getElementById(id);
        var _data = new FormData(_form);

        if (id == '1') {
            const res = await axios({
                method: 'put',
                url: "https://mighty-plains-90447.herokuapp.com/v1/product/createone",
                headers: {
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: _data.get('name'),
                    price: _data.get('price'),
                    description: _data.get('description'),
                    isActive: _data.get('isActive')
                }
            }).then(function (res) {
                    alert('Add Items Success');
                    return res;
                }
            ).catch(function (err) {
                alert(err)
            });
        } else if (id == '2') {
            const res = await axios({
                method: 'put',
                url: "https://mighty-plains-90447.herokuapp.com/v1/product/update",
                headers: {
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: {
                    id: _data.get('id'),
                    name: _data.get('name'),
                    price: _data.get('price'),
                    description: _data.get('description'),
                    isActive: _data.get('isActive')
                }
            }).then(function (res) {
                    alert('Update Item Success');
                    return res;
                }
            ).catch(function (err) {
                alert(err)
            });
        } else if (id == '3') {
            const res = await axios({
                method: 'put',
                url: "https://mighty-plains-90447.herokuapp.com/v1/product/updateprev",
                headers: {
                    "Authorization": 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data',
                    'Encriptype': 'multipart/form-data',
                },
                data: _data,
            }).then(function (res) {
                    alert('Update Image Success');
                    return res;
                }
            ).catch(function (err) {
                alert(err)
            });
        }

    }

    return (
        <div className={classes.tableResponsive}>
            <div class='FormAddItems' style={{display: 'none'}}>
                <Button variant="primary" size="lg" onClick={clickReturnToList}>Back</Button>
                <form id='1'  onSubmit={(e) => {
                    handleSubmit(e, '1')
                }}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>
                            <input placeholder="Tên sản phẩm" size={30} style={inputStyle} type="text" name='name' value={name} onChange={(e) => {
                                handleChangeInputTag(e, setName)
                            }}/>
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>
                            <input placeholder=" Giá" size={30} style={inputStyle} type="number" name='price' value={price}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setPrice)
                                   }}/>
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>
                            <input placeholder='Mô tả' size={30} style={inputStyle} type="text" name='description' value={description}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setDescription)
                                   }}/>
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                            <GridItem xs={12} sm={12} md={5}>
                                <br/>
                            <input placeholder='còn hàng' size={30} style={inputStyle} type="text" name='isActive' value={isActive}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setIsActive)
                                   }}/>
                        </GridItem>
                        <GridItem xs={1} sm={1} md={1}></GridItem>
                    </GridContainer>
                    <br/>
                    <br/>
                    <br/>
                    <div height="30">
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="Submit"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                        >
                            Lưu
                        </Button>

                    </div>
                </form>
            </div>

            <div class='FormFixItems' style={{display: 'none'}}>
                <Button onClick={clickReturnToList}>Back</Button>
                <form id='2' onSubmit={(e) => {
                    handleSubmit(e, '2')
                }}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>
                            ID:
                            <br/>
                            <input size={30} style={inputStyle} type="text" name='id' value={maSP}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>

                            Tên sản phẩm
                            <br/>
                            <input size={30} style={inputStyle} type="text" name='name' value={name} onChange={(e) => {
                                handleChangeInputTag(e, setName)
                            }}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>

                            Giá
                            <br/>
                            <input size={30} style={inputStyle} type="number" name='price' value={price}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setPrice)
                                   }}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>

                            Mô tả
                            <br/>
                            <input size={30} style={inputStyle} type="text" name='description' value={description}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setDescription)
                                   }}/>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={5}>
                            <br/>

                            còn hàng
                            <br/>
                            <input size={30} style={inputStyle} type="text" name='isActive' value={isActive}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setIsActive)
                                   }}/>
                        </GridItem>


                    </GridContainer>
                    <div height="30">
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            type="Submit"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                        >
                            Lưu
                        </Button>

                    </div>
                </form>
            </div>

            <div className='FormFixImageItems' style={{display: 'none'}}>
                <Button onClick={clickReturnToList}>Back</Button>
                <form id='3' style={{textAlign: 'left'}} onSubmit={(e) => {
                    handleSubmit(e, '3')
                }}>

                    <GridContainer>
                        <GridItem xs={2} sm={2} md={1}>
                        </GridItem>
                        <GridItem xs={10} sm={10} md={4}>

                                ID:

                            <br/>
                            <input style={inputStyle} type="text" disabled="disabled" name='id' value={maSP}/>

                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={2} sm={2} md={1}>
                        </GridItem>
                        <GridItem xs={10} sm={10} md={1}>
                            <GridItem xs={2} sm={2} md={1}>
                            </GridItem>
                            <br/>

                                Ảnh


                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={2} sm={2} md={1}>
                        </GridItem>
                        <GridItem xs={10} sm={10} md={4}>
                            <input type="file" style={inputStyle} name='preview'/>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <GridItem xs={2} sm={2} md={1}>
                        </GridItem>
                        <GridItem xs={10} sm={10} md={4}>
                            <br/>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                type="Submit"
                                className={classes.button}
                                startIcon={<SaveIcon/>}
                            >
                                Lưu
                            </Button>
                        </GridItem>
                    </GridContainer>
                </form>
            </div>

            <div className={classes.table}>
                <Button id='add' onClick={() => clickAddItems()}><AddIcon/></Button>
                {/*<Button id='restore' onClick={()=>clickRestore()}><RestoreIcon/></Button>*/}
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
                                        <Button id='fix' onClick={(e) => clickFix(e, prop)}><BorderColorIcon/></Button>
                                        <Button id='fixImage'
                                                onClick={(e) => clickFixImage(e, prop)}><ImageIcon/></Button>
                                        <Button id='delete' onClick={(e) => clickDelete(e, prop)}><DeleteIcon/></Button>
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

ItemsTable.defaultProps = {
    tableHeaderColor: "gray"
};

ItemsTable.propTypes = {
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



