import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
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
import ChartistGraph from "react-chartist";
import AccessTime from "@material-ui/icons/AccessTime";
import {
    emailsSubscriptionChart,
} from "variables/charts.js";


export default function Statistics(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [data1, setData1] = useState([]);
    const [token, setToken] = useState();
    const [revenueData, setRevenueData] = useState();
    const [day, setDay] = useState();
    const [labels, setNamePD] = useState();
    const [series, setCount] = useState();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [high, setHigh] = useState();
    const itemsTimeJson = {
        data: {
            labels,
            series
        },
        options: {
            low: 0,
            high
        },
    };
    const itemsTimeJson1 = {
        'header': ['ID nhân viên', 'Tên nhân viên', 'Số lượng đơn hàng', 'Tổng thu'],
        'data': data1
    };

    function handleChangeInputTag(e, func) {
        e.preventDefault();
        func(e.target.value);
    }

    async function handleSubmit(e, id) {
        e.preventDefault();
        var _form = document.getElementById(id);
        var _data = new FormData(_form);
        if (id == '4') {


            // const res3 = await axios({
            //     method: 'post',
            //     url: "https://mighty-plains-90447.herokuapp.com/v1/account/signin",
            //     headers: {
            //         'Encriptype': 'multipart/form-data',
            //     },
            //     data: {
            //         account: "huykkk",
            //         password: "000000"
            //     }
            // }).catch(function (err) {
            //     alert(err)
            // });
            // so luong san pham ban hang
            const res4 = await axios({
                method: 'post',
                url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/product",
                header: localStorage.getItem("token"),
                headers: {
                    'Header': localStorage.getItem("token"),
                    'Encytype': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                data: {
                    start: _data.get('start').split("-").reverse().join("-"),
                    end: _data.get('end').split("-").reverse().join("-")
                }
            }).catch(function (err1) {
                alert(err1)
            });
//nhan vien và don dat hang

            const res5 = await axios({
                method: 'post',
                url: "https://mighty-plains-90447.herokuapp.com/v1/stat/employee/order",
                header: localStorage.getItem("token"),
                headers: {
                    'Header': localStorage.getItem("token"),
                    'Encytype': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                data: {
                    start: _data.get('start').split("-").reverse().join("-"),
                    end: _data.get('end').split("-").reverse().join("-")
                }
            }).catch(function (err1) {
                alert(err1)
            });
//thong ke thu nhap
            const res6 = await axios({
                method: 'post',
                url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue",
                header: localStorage.getItem("token"),
                headers: {
                    'Header': localStorage.getItem("token"),
                    'Encytype': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                data: {
                    start: _data.get('start').split("-").reverse().join("-"),
                    end: _data.get('end').split("-").reverse().join("-")
                }
            }).catch(function (err1) {
                alert(err1)
            });
            var listNamePD = [];
            var listCountPD = [];
            var list1 = [];
            var sumOrder = 0;
            var sumMoney = 0;
            var sumItem = 0;
            var countHigh = 0;
            var sumRevenue = 0;
            const arr = Object.keys(res4.data.revenue);// ra productID o dang mang
            const eo = Object.keys(res5.data.revenue);
            const eo1 = Object.values(res5.data.revenue);
            const eo2 = Object.values(eo1[0]);// tang k++
//do thi product
            for (var i = 0; i < arr.length; i++) {
                listNamePD.push([
                    Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[1]
                    // + "<br/>" + Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[0]
                        // + "<br/>" +Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[2]
                        .toString()
                ])
                for (var j = 0; j < Object.values(Object.values(res4.data.revenue)[0])[0].length; j++) {
                    sumItem += (Object.values(Object.values(res4.data.revenue)[i])[0][j]);
                }
                listCountPD.push(sumItem.toString());
                if (countHigh < sumItem) {
                    countHigh = sumItem + 4
                }
                sumItem = 0;
            }
            for (var k = 0; k < eo.length; k++) {
                for (var j = 0; j < eo2[0].length; j++) {
                    sumOrder += Object.values(eo1[k])[0][j];
                    sumMoney += Object.values(eo1[k])[1][j];
                }
                list1.push([
                    eo[k],
                    Object.values(Object.values(eo1[k])[2])[1] + " " + Object.values(Object.values(eo1[k])[2])[2],
                    sumOrder,
                    sumMoney + " Đ"
                        .toString()]);
                sumOrder = 0;
                sumMoney = 0;
            }
            for (var i = 0; i < res6.data.revenue.length; i++) {
                sumRevenue += res6.data.revenue[i];
            }

            setRevenueData(sumRevenue + " Đồng")
            setDay(res6.data.revenue.length + " ngày");
            setHigh(countHigh);
            setCount([listCountPD]);
            setNamePD(listNamePD);
            setData1(list1);
            setToken(localStorage.getItem("token"));

        }
    }

    useEffect(() => {
        getData1()
    }, []);

    async function getData1() {
        var today = new Date();
        var dateC = '0' + today.getDate() + '-' + '0' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var dateB = ('28') + '-' + '0' + (today.getMonth()) + '-' + today.getFullYear();
        // const res3 = await axios({
        //     method: 'post',
        //     url: "https://mighty-plains-90447.herokuapp.com/v1/account/signin",
        //     headers: {
        //         'Encriptype': 'multipart/form-data',
        //     },
        //     data: {
        //         account: "huykkk",
        //         password: "000000"
        //     }
        // }).catch(function (err) {
        //     alert(err)
        // });

        const res4 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/product",
            header: localStorage.getItem("token"),
            headers: {
                'Header': localStorage.getItem("token"),
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: {
                start: dateB,
                end: dateC
            }
        }).catch(function (err1) {
            alert(err1)
        });

        const res5 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/employee/order",
            header: localStorage.getItem("token"),
            headers: {
                'Header': localStorage.getItem("token"),
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: {
                start: dateB,
                end: dateC
            }
        }).catch(function (err1) {
            alert(err1)
        });

        const res6 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue",
            header: localStorage.getItem("token"),
            headers: {
                'Header': localStorage.getItem("token"),
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data: {
                start: dateB,
                end: dateC
            }
        }).catch(function (err1) {
            alert(err1)
        });
        var listNamePD = [];
        var listCountPD = [];
        var list1 = [];
        var sumOrder = 0;
        var sumMoney = 0;
        var sumItem = 0;
        var countHigh = 0;
        var sumRevenue = 0;
        const arr = Object.keys(res4.data.revenue);// ra productID o dang mang
        const eo = Object.keys(res5.data.revenue);
        const eo1 = Object.values(res5.data.revenue);
        const eo2 = Object.values(eo1[0]);// tang k++
//do thi product
        for (var i = 0; i < arr.length; i++) {
            listNamePD.push([
                Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[1]
                // + "<br/>" + Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[0]
                    // + "<br/>" +Object.values(Object.values(Object.values(res4.data.revenue)[i])[1])[2]
                    .toString()
            ])
            for (var j = 0; j < Object.values(Object.values(res4.data.revenue)[0])[0].length; j++) {
                sumItem += (Object.values(Object.values(res4.data.revenue)[i])[0][j]);
            }
            listCountPD.push(sumItem.toString());
            if (countHigh < sumItem) {
                countHigh = sumItem + 4
            }
            sumItem = 0;
        }
        for (var k = 0; k < eo.length; k++) {
            for (var j = 0; j < eo2[0].length; j++) {
                sumOrder += Object.values(eo1[k])[0][j];
                sumMoney += Object.values(eo1[k])[1][j];
            }
            list1.push([
                eo[k],
                Object.values(Object.values(eo1[k])[2])[1] + " " + Object.values(Object.values(eo1[k])[2])[2],
                sumOrder,
                sumMoney + " Đ"
                    .toString()]);
            sumOrder = 0;
            sumMoney = 0;
        }
        for (var i = 0; i < res6.data.revenue.length; i++) {
            sumRevenue += res6.data.revenue[i];
        }

        setRevenueData(sumRevenue + " Đồng")
        setDay(res6.data.revenue.length + " ngày gần nhất");
        setHigh(countHigh);
        setCount([listCountPD]);
        setNamePD(listNamePD);
        setData1(list1);
        setToken(localStorage.getItem("token"));
    }

    return (
        <div>
            <CardHeader color="info">
                <div className='FormDay'>
                    <form id='4' onSubmit={(e) => {
                        handleSubmit(e, '4')
                    }}>
                        <label className="start">Bắt đầu</label>
                        <label className="start inp">
                            <input type="date" name='start' placeholder="dd-mm-yyyy"
                                   value={start}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setStart)
                                   }}/>
                        </label>


                        <label style={{color: '#fff'}}>Kết thúc</label>
                        <label className="end inp inp1">
                            <input className="inp1" type="date" name='end' placeholder="dd-mm-yyyy" value={end}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setEnd)
                                   }}
                            />
                        </label>

                        <input type="Submit" value='Duyệt'/>
                    </form>
                </div>
            </CardHeader>

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
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card chart>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={itemsTimeJson.data}
                                type="Bar"
                                options={itemsTimeJson.options}
                                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                                listener={emailsSubscriptionChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Số lượng sản phẩm bán được trên từng sản phẩm</h4>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/> thời gian : {day}
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Số lượng đơn hàng mà nhân viên nhập theo thời
                                gian</h4>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="info"
                                tableHead={itemsTimeJson1['header']}
                                tableData={itemsTimeJson1['data']}
                                token={token}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}

