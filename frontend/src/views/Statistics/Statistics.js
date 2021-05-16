import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";
import {Button} from "react-bootstrap";

import ChartistGraph from "react-chartist";
import AccessTime from "@material-ui/icons/AccessTime";
// const useStyles = makeStyles(styles);
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";



export default function Statistics(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [loading, setLoad] = useState(true);
    const [token, setToken] = useState();
    const [revenueData, setRevenueData] = useState();
    const [day, setDay] = useState();
    const [labels, setNamePD] = useState();
    const [series, setCount] = useState();
    const [start,setStart] = useState('');
    const [end,setEnd] = useState('');
    // const today = new Date();
    const itemsTimeJson = {
        'header': ['ID sản phẩm', 'Tên sản phẩm', 'Số lượng sản phẩm đã bán', 'Giá'],
        'data': {
            labels,
            series
        },
    };
    const itemsTimeJson1 = {
        'header': ['ID nhân viên', 'Tên nhân viên', 'Số lượng đơn hàng', 'Tổng thu'],
        'data': data1
    };
    // const {token} = props;
    function handleChangeInputTag(e,func){
        e.preventDefault();
        func(e.target.value);
    }
    // useEffect(() => {
    //     getData1()
    // }, []);
    async function handleSubmit(e,id) {
        e.preventDefault();
        var _form = document.getElementById(id);
        var _data = new FormData(_form);
        if (id == '4'){


            // async function getData1() {
            //     if (loading == true) {
                    const res3 = await axios({
                        method: 'post',
                        url: "https://mighty-plains-90447.herokuapp.com/v1/account/signin",
                        headers: {
                            'Encriptype': 'multipart/form-data',
                        },
                        data: {
                            account: "huykkk",
                            password: "000000"
                        }
                    }).catch(function (err) {
                        alert(err)
                    });
                    // so luong san pham ban hang
                    const res4 = await axios({
                        method: 'post',
                        url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/product",
                        header: res3.data['token'],
                        headers: {
                            'Header': res3.data['token'],
                            'Encytype': 'application/json',
                            "Authorization": 'Bearer ' + res3.data['token'],
                            'Content-Type': 'application/json'
                        },
                        data: {
                            start: _data.get('start'),
                            end: _data.get('end')
                        }
                    }).catch(function (err1) {
                        alert(err1)
                    });
//nhan vien và don dat hang

                    const res5 = await axios({
                        method: 'post',
                        url: "https://mighty-plains-90447.herokuapp.com/v1/stat/employee/order",
                        header: res3.data['token'],
                        headers: {
                            'Header': res3.data['token'],
                            'Encytype': 'application/json',
                            "Authorization": 'Bearer ' + res3.data['token'],
                            'Content-Type': 'application/json'
                        },
                        data: {
                            start: _data.get('start'),
                            end: _data.get('end')
                        }
                    }).catch(function (err1) {
                        alert(err1)
                    });

                    const res6 = await axios({
                        method: 'post',
                        url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue",
                        header: res3.data['token'],
                        headers: {
                            'Header': res3.data['token'],
                            'Encytype': 'application/json',
                            "Authorization": 'Bearer ' + res3.data['token'],
                            'Content-Type': 'application/json'
                        },
                        data: {
                            start: _data.get('start'),
                            end: _data.get('end')
                        }
                    }).catch(function (err1) {
                        alert(err1)
                    });

                    var listNamePD = [];
                    var listCountPD = [[]];
                    var sumItem = 0;
                    const arr = Object.keys(res4.data.revenue);// ra productID o dang mang
                    // const arr1 = Object.keys(arr[0]);

                    for (var i = 0; i < arr.length; i++) {
                        listNamePD.push([
                            Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[1]
                            + "<br/>" + Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[0]
                                .toString()
                        ])
                    }

                    for (var i = 0; i < arr.length; i++) {
                        for (var j = 0; j < Object.values(Object.values(res4.data.revenue)[0])[0].length; j++) {
                            // if (i == arr.length) break;
                            sumItem += (Object.values(Object.values(res4.data.revenue)[i])[0][j]+1)/5;
                        }
                        listCountPD.push(sumItem.toString());
                        // sumItem = 0;
                    }
                    // const arr4 = Object.values(res4.data.revenue);

                    // const arr5 = Object.keys(arr4[0])[1];//lay dc ten metadata
                    // const arr6 = Object.values(arr4[0]);// thay doi ++1
                    // arr6[0][2]     lay dc gia tri ban hang ngay thu 3
                    // const arr7 = Object.values(arr6[1]);
                    // arr7[1]   //ra ten cua san pham 1


                    // for (var i = 0; i < arr.length; i++) {
                    //     // var arr6 = Object.values(arr4[i]);
                    //     //  arr7[0],arr7[1], arr6[0],arr7[2]
                    //     for (var j = 0; j < Object.values(Object.values(res4.data.revenue)[0])[0].length; j++) {
                    //         sumItem += Object.values(Object.values(res4.data.revenue)[i])[0][0];
                    //     }
                    //         list.push([
                    //             Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[0],
                    //             Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[1],
                    //             // Object.values(Object.values(res4.data.revenue)[i])[0],
                    //             sumItem,
                    //             Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[2].toString()]);
                    //     }
                    //order
                    var list1 = [];
                    var sumOrder = 0;
                    var sumMoney = 0;
                    const eo = Object.keys(res5.data.revenue);
                    const eo1 = Object.values(res5.data.revenue);
                    const eo2 = Object.values(eo1[0]);// tang k++
                    //eo2[0][2] ra so luong don hang ngay 3 cua nhan vien 1
                    // eo2[1][2] ra so tien ban hang ngay 3 cua nhan vien 1
                    // const eo3 = Object.values(eo2[2]);
                    //eo3[1] ra first name nhan vien
                    for (var k=0; k<eo.length; k++) {
                        for (var j=0; j<eo2[0].length; j++){
                            sumItem += Object.values(eo1[k])[0][j];
                            sumMoney += Object.values(eo1[k])[1][j];
                        }
                        list1.push([
                            eo[k],
                            Object.values(Object.values(eo1[k])[2])[1]+" "+Object.values(Object.values(eo1[k])[2])[2],
                            sumOrder,
                            sumMoney + " Đ"
                                .toString()]);
                    }
//thu nhap tong
                    var sumRevenue = 0;
                    for(var i=0;i<res6.data.revenue.length; i++){
                        sumRevenue += res6.data.revenue[i];
                    }
// var countDay ;
// if(res6.data.revenue.length >=7){
//     return countDay ="tuần"
// } else if (res6.data.revenue.length<7){
//     return countDay ="ngày"
// }
                    setRevenueData(sumRevenue+" Đồng")
                    setDay(res6.data.revenue.length + " ngày");

                    setCount([listCountPD]);
                    setNamePD(listNamePD);
                    setData1(list1);
                    setLoad(false);
                    setToken(res3.data['token']);
                // }
            }
        }
    //     window.location.reload();
    // }



    return (
        <div>
            <CardHeader color="info">
                <div className='FormDay'>

                    <form id='4'
                              onSubmit={(e) => {
                            handleSubmit(e, '4')
                        }}
                    >
                        <label className="start">Start</label>
                        <label className="start">
                            <input type="text" name='start' placeholder="dd-mm-yyyy"
                            value={start}
                                   onChange={(e)=>{handleChangeInputTag(e,setStart)}}
                            />
                        </label>
                        <label style={{color: '#fff'}}>End</label>
                        <label className="end">
                            <input type="text" name = 'end' placeholder="dd-mm-yyyy" value={end}
                                   onChange={(e)=>{handleChangeInputTag(e,setEnd)}}
                            />
                        </label>

                        <input type="Submit" value='Submit'/>
                    </form>
                </div>
            </CardHeader>
            {/*<div className={classes.tableResponsive}>*/}
            {/*<div className='FormDay'>*/}

            {/*    <form id='x'*/}
            {/*    //       onSubmit={(e) => {*/}
            {/*    //     handleSubmit(e, 'x')*/}
            {/*    // }}*/}
            {/*    >*/}
            {/*        <label>*/}
            {/*           Start:*/}

            {/*            <input type="text" name='start' placeholder="dd-mm-yyyy"/>*/}
            {/*        </label>*/}

            {/*        <label>*/}
            {/*            End:*/}

            {/*            <input type="text" name = 'end' placeholder="dd-mm-yyyy"/>*/}
            {/*        </label>*/}

            {/*        <input type="Submit" value='Submit'/>*/}
            {/*    </form>*/}
            {/*</div>*/}
            {/*</div>*/}
            <GridContainer>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Tổng doanh thu {day}</p>
                            <h3 className={classes.cardTitle}>{revenueData}</h3>
                        </CardHeader>
                        {/*<CardFooter stats>*/}
                        {/*    <div className={classes.stats}>*/}
                        {/*        <DateRange/>*/}
                        {/*        {day}*/}
                        {/*    </div>*/}
                        {/*</CardFooter>*/}
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={itemsTimeJson.data}
                                type="Bar"
                                options={emailsSubscriptionChart.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Số lượng sản phẩm bán được trên từng sản phẩm</h4>
                            {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime /> thời gian : {day}
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Số lượng đơn hàng mà nhân viên nhập theo thời gian</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="info"
                                tableHead={itemsTimeJson1['header']}
                                tableData={itemsTimeJson1['data']}
                                token = {token}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

