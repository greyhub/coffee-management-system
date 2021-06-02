import React, {useEffect, useState} from "react";
import ChartistGraph from "react-chartist";
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Store from "@material-ui/icons/Store";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Dashboard() {
    const classes = useStyles();
    const [sell, setSell] = useState();
    const [buy, setBuy] = useState();
    const [revunueMonth, setRevunueMonth] = useState();
    const [countSellPD, setCountSellPD] = useState();
    const [countEM, setCountEM] = useState();
    const [labels1, setLabels1] = useState();
    const [series1, setSeries1] = useState();
    const [high1, setHigh1] = useState();
    const [labels2, setLabels2] = useState();
    const [series2, setSeries2] = useState();
    const [high2, setHigh2] = useState();
    const [labels3, setLabels3] = useState();
    const [series3, setSeries3] = useState();
    const [high3, setHigh3] = useState();

    const data24 = {
        data: {
            labels: labels1,
            series: series1,
        },
        options: {
            low: 0,
            high: high1,
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
    };

    const data7 = {
        data: {
            labels: labels3,
            series: series3,
        },
        options: {
            low: 0,
            high: high3,
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
    };

    const data5 = {
        data: {
            labels: labels2,
            series: series2,
        },
        options: {
            low: 0,
            high: high2,
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
    };

    var today = new Date();
    var date7 = ('28') + '-' + '0' + (today.getMonth()) + '-' + today.getFullYear();
    var dateS = "01" + '-' + '0' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var dateE = '0' + today.getDate() + '-' + '0' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var sumRevunueMonth = 0;
    var sumCountSellPD = 0;
    var listLables = [];
    var listSeries = [];
    var countHigh = 0;

    var listLables3 = [
        (today.getDate() - 6) + '-'  + (today.getMonth() + 1),
        (today.getDate() - 5) + '-'  + (today.getMonth() + 1),
        (today.getDate() - 4) + '-'  + (today.getMonth() + 1),
        (today.getDate() - 3) + '-'  + (today.getMonth() + 1),
        (today.getDate() - 2) + '-'  + (today.getMonth() + 1),
        (today.getDate() - 1) + '-'  + (today.getMonth() + 1),
        today.getDate() + '-'  + (today.getMonth() + 1)
    ];
    var listSeries3 = [];
    var countHigh3 = 0;


    useEffect(() => {
        getData2()
    }, []);

    async function getData2() {
        const resp = await axios({
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
//Tổng bán / tổng mua theo tháng
        const resp1 = await axios({
            method: 'get',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/cost",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            }
        })
        // Doanh thu tháng (tính từ ngày mùng 1)
        const resp2 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
            data: {
                start: "01" + '-' + '01' + '-' + today.getFullYear(),
                end: dateE
            }
        })
        //Số sản phẩm bán được (tính từ ngày mùng 1)
        const resp3 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/product",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
            data: {
                start: dateS,
                end: dateE
            }
        })
        //Tổng số nhân viên
        const resp4 = await axios({
            method: 'get',
            url: "https://mighty-plains-90447.herokuapp.com/v1/employee",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
        })
//Doanh thu trong 7 ngày gần nhất
        const resp5 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
            data: {
                start: date7,
                end: dateE
            }
        })


        //Doanh thu trong 24h gần nhất (3 tiếng một)
        const resp6 = await axios({
            method: 'get',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/24h",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
        })
//so luong ban hang trong 30 ngay
        const resp7 = await axios({
            method: 'post',
            url: "https://mighty-plains-90447.herokuapp.com/v1/stat/revenue/product",
            header: resp.data['token'],
            headers: {
                'Header': resp.data['token'],
                'Encytype': 'application/json',
                "Authorization": 'Bearer ' + resp.data['token'],
                'Content-Type': 'application/json'
            },
            data: {
                start: '0' + today.getDate() + '-' + '0' + today.getMonth() + '-' + today.getFullYear(),
                end: dateE
            }
        })

        for (var i = 0; i < resp2.data.revenue.length; i++) {
            sumRevunueMonth += resp2.data.revenue[i];
        }

        sumRevunueMonth = sumRevunueMonth/1000000;
        sumRevunueMonth= Math.round(sumRevunueMonth);

        for (var i = 0; i < Object.keys(resp3.data.revenue).length; i++) {
            for (var j = 0; j < Object.values(Object.values(resp3.data.revenue)[0])[0].length; j++) {
                sumCountSellPD += (Object.values(Object.values(resp3.data.revenue)[i])[0][j]);
            }
        }
        //7 ngay doanh thu
        for (var i = 0; i < resp5.data.revenue.length; i++) {
            var y = resp5.data.revenue[i]/1000000;
            listSeries3.push(y.toString())
            if (countHigh3 < y) {
                countHigh3 = Math.round(y) + 1;
            }
        }

        for (var i = 0; i < resp6.data.revenue.length; i++) {
            listLables.push([resp6.data.revenue[i][0]+"h".toString()]);
            var y = resp6.data.revenue[i][1]/1000000;
            listSeries.push(y.toString());
            if (countHigh < y) {
                countHigh = Math.round(y)+1;
            }
        }
        //5 mặt hàng bán chạy nhất trong 30 ngày gần nhất
        var sumItem = 0;
        var listNamePD = [];
        var countHigh2 = 0;
        var listSeries2 = [];

        // Object.keys(resp7.data.revenue).length
        for (var i = 0; i < 5; i++) {
            listNamePD.push([
                Object.values(Object.values(Object.values(resp7.data.revenue)[i])[1])[1].toString()])

            for (var j = 0; j < Object.values(Object.values(resp7.data.revenue)[0])[0].length; j++) {
                sumItem += (Object.values(Object.values(resp7.data.revenue)[i])[0][j]);
            }
            listSeries2.push(sumItem.toString());
            if (countHigh2 < sumItem) {
                countHigh2 = sumItem + 4;
            }
            sumItem = 0;
        }

        setSell(Math.round(resp1.data.revenue/1000000));
        setBuy(Math.round(resp1.data.cost/1000000));
        setRevunueMonth(sumRevunueMonth);
        setCountSellPD(sumCountSellPD);
        setCountEM(resp4.data.employees.length);

        setHigh1(countHigh);
        setLabels1(listLables);
        setSeries1([listSeries]);

        setHigh2(countHigh2);
        setLabels2(listNamePD);
        setSeries2([listSeries2]);

        setHigh3(countHigh3);
        setLabels3(listLables3);
        setSeries3([listSeries3]);


    }


    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Icon>content_copy</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Thu/Chi tháng</p>
                            <h3 className={classes.cardTitle} >
                                {sell}/{buy}
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Đơn vị: Triệu đồng
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Doanh thu năm</p>
                            <h3 className={classes.cardTitle}>{revunueMonth}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Đơn vị: Triệu đồng
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Icon>attach_money</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Tổng bán được</p>
                            <h3 className={classes.cardTitle}>{countSellPD}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Đơn vị: Sản phẩm
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Accessibility/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Nhân lực</p>
                            <h3 className={classes.cardTitle}>{countEM}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Đơn vị: Nhân viên
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>

            </GridContainer>


            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={data24.data}
                                type="Line"
                                options={data24.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Doanh thu trong 24h gần nhất
                            </h4>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/> Đơn vị: Triệu đồng
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                      <CardHeader color="warning">
                        <ChartistGraph
                          className="ct-chart"
                          data={data5.data}
                          type="Bar"
                          options={data5.options}
                          responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                          listener={emailsSubscriptionChart.animation}
                        />
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>5 mặt hàng bán chạy nhất trong 30 ngày</h4>
                      </CardBody>
                      <CardFooter chart>
                        <div className={classes.stats}>
                            Đơn vị: Sản phẩm
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <Card chart>
                      <CardHeader color="danger">
                        <ChartistGraph
                          className="ct-chart"
                          data={data7.data}
                          type="Line"
                          options={data7.options}
                          listener={completedTasksChart.animation}
                        />
                      </CardHeader>
                      <CardBody>
                        <h4 className={classes.cardTitle}>Doanh thu trong 7 ngày gần nhất</h4>
                        {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
                      </CardBody>
                      <CardFooter chart>
                        <div className={classes.stats}>
                          <AccessTime /> Đơn vị: Triệu đồng
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
            </GridContainer>
        </div>
    );
}
