import React from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//core compontment
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePurchasing.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";



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

const useStyles = makeStyles(styles);

var purchasingJson = {
    'header':['STT','Ten nguyen lieu','Nha cung cap','Ngay nhap','So luong','Don gia(VND)','Don vi','Chi phi(VND)','Chi tiet'], 
    'data':[['1','Hat ca phe','Trung Nguyen','01/04/2021','100','100.000','gram','3.000.000','Chiet khau 10%'], 
            ['2','Hat ca phe','Trung Nguyen','01/04/2021','100','100.000','gram','3.000.000','Chiet khau 10%']]}

export default function Purchasing(){
    const classes = useStyles();
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Thong tin nguyen lieu</h4>
                        <p className={classes.cardCategoryWhite}>
                        Nguyen lieu thu mua theo thoi gian
                        </p>
                    </CardHeader>
                    <CardBody>
                    <Table
                        tableHeaderColor="info"
                        tableHead={purchasingJson['header']}
                        tableData={purchasingJson['data']}                        
                    />
                    </CardBody>
                </Card>
            </GridItem>
      </GridContainer>
    );
} 