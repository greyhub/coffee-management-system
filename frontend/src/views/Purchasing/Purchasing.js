import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//core compontment
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePurchasing.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { getAllJSDocTags } from 'typescript';
import axios from 'axios';
import { alphaNumerate } from 'chartist';



const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };

export default function Purchasing(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoad] = useState(true);
    const [token, setToken] = useState();
    const purchasingJson = {'header':['STT','Ten nguyen lieu','Nha cung cap','Ngay nhap','So luong','Don gia(VND)','Don vi','Chi phi(VND)','Chi tiet'], 'data':data};
    useEffect(()=>{
        getData()
    },[]);
    async function getData(){
        if(loading == true){
            const res = await axios({
                method: 'post',
                url   : "https://mighty-plains-90447.herokuapp.com/v1/account/signin",
                headers:{
                    'Encriptype': 'multipart/form-data',
                },
                data:{
                    account : "huykkk",
                    password: "000000"
                }
            }).catch(function(err){
                alert(err)
            });
            const res1 = await axios({
                method: 'get',
                url: "https://mighty-plains-90447.herokuapp.com/v1/product",
                header: res.data['token'],
                headers:{
                    'Header': res.data['token'],
                    'Encytype': 'application/json',
                    "Authorization": 'Bearer ' + res.data['token']
                }
            }).catch(function(err1){
                alert(err1)
            });
            var list = [];
            for(var i = 0;i<res1.data['products'].length;i++){
                list.push([res1.data['products'][i]['id'], res1.data['products'][i]['name'], 
                res1.data['products'][i]['price'], res1.data['products'][i]['description'],
                res1.data['products'][i]['previewUri'],res1.data['products'][i]['isActive'],
                res1.data['products'][i]['name'], res1.data['products'][i]['name'], 
                res1.data['products'][i]['name'].toString()]);
            }
            setData(list);
            setLoad(false);
            setToken(res.data['token']);
        }
    }
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Thông tin nguyên liệu</h4>
                        <p className={classes.cardCategoryWhite}>
                            Nguyên liệu thu mua theo thời gian
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="info"
                            tableHead={purchasingJson['header']}
                            tableData={purchasingJson['data']}
                            token = {token}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}