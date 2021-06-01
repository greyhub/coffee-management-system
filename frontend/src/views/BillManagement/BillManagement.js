import React, {useEffect, useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TableBills.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios'


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

export default function OrderManagement(){
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [data,setData] = useState([]);
    const [loading,setLoad] = useState(true);
    const [token, setToken] = useState();
    var employeesJson = {'header':['Mã đơn hàng','Mã nhân viên','Ngày tạo','Giá trị','Tên khách hàng','Ghi chú'],'data':data}
    useEffect(()=>{
      getData()
    },[]);
    async function getData(){
      if(loading == true){
      // const res = await axios({
      //   method: 'post',
      //   url: "https://mighty-plains-90447.herokuapp.com/v1/account/signin",
      //   headers:{
      //     'Encytpe': 'multipart/form-data',
      //   },
      //   data:{
      //     account: '222222352ab80',
      //     password: '2310-12a'
      //   }
      // }).catch(function(err){
      //   alert(err)
      // });
      const res1 = await axios({
        method: 'get',
        url: "https://mighty-plains-90447.herokuapp.com/v1/order",
        header: localStorage.getItem("token"),
        headers:{
            'Header': localStorage.getItem("token"),
            'Encytype': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem("token")
        }
      }).catch(function(err1){
        alert(err1)
      });
       var list = [];
       for(var i =0 ; i < res1.data["orders"].length;i++){
        list.push([res1.data["orders"][i]["id"],res1.data["orders"][i]["employee"]["id"],res1.data["orders"][i]["updateAt"],res1.data["orders"][i]["money"],res1.data["orders"][i]["employee"]["firstName"],res1.data["orders"][i]["note"]]);
       }
       setData(list);
       setLoad(false);
       setToken(localStorage.getItem("token"));
    }
    }
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Quản lý đơn hàng</h4>
                        <p className={classes.cardCategoryWhite}>
                          Danh sách đơn hàng 
                        </p>
                    </CardHeader>
                    <CardBody>
                    <Table
                        tableHeaderColor="info"
                        tableHead={employeesJson['header']}
                        tableData={employeesJson['data']}      
                        token = {token}                  
                    />
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
    );
}