// import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
//improt css
import "assets/css/argon-design-system-react.css";
// reactstrap components
import {
    // Card,
    // CardBody,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Row,
    Col,
    Button
} from "reactstrap";

class Items extends React.Component {
    state = {
        iconTabs: 1,
        plainTabs: 1
    };
    toggleNavs = (e, state, index) => {
        e.preventDefault();
        this.setState({
            [state]: index
        });
    };

    render() {
        return (
            <>
                <h3 className="h4 text-success font-weight-bold mb-4">MENU</h3>
                <Row className="justify-content-center">
                    <Col className="mt-5 mt-lg-0" lg="6">
                        <div className="nav-wrapper">
                            <Nav
                                className="nav-fill flex-column flex-md-row"
                                id="tabs-icons-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        aria-selected={this.state.plainTabs === 1}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: this.state.plainTabs === 1
                                        })}
                                        onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                                        href="#pablo"
                                        role="tab"
                                    >
                                        Cà phê
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={this.state.plainTabs === 2}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: this.state.plainTabs === 2
                                        })}
                                        onClick={e => this.toggleNavs(e, "plainTabs", 2)}
                                        href="#pablo"
                                        role="tab"
                                    >
                                        Nước hoa quả
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={this.state.plainTabs === 3}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: this.state.plainTabs === 3
                                        })}
                                        onClick={e => this.toggleNavs(e, "plainTabs", 3)}
                                        href="#pablo"
                                        role="tab"
                                    >
                                        Bánh ngọt
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        aria-selected={this.state.plainTabs === 4}
                                        className={classnames("mb-sm-3 mb-md-0", {
                                            active: this.state.plainTabs === 4
                                        })}
                                        onClick={e => this.toggleNavs(e, "plainTabs", 4)}
                                        href="#pablo"
                                        role="tab"
                                    >
                                        Đồ uống đá xay
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        <Card className="shadow">
                            <CardBody>
                                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                                    <TabPane tabId="plainTabs1">
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card>
                                                    <CardBody>
                                                        <Table
                                                            tableHeaderColor="primary"
                                                            tableHead={["ảnh", "tên mặt hàng", "mô tả", "giá tiền", "số lượng", "lựa chọn"]}
                                                            tableData={[
                                                                ["ko hiển thị", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],

                                                            ]}
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </TabPane>
                                    <TabPane tabId="plainTabs2">
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card>
                                                    <CardBody>
                                                        <Table
                                                            tableHeaderColor="primary"
                                                            tableHead={["ảnh", "tên mặt hàng", "mô tả", "giá tiền", "số lượng", "lựa chọn"]}
                                                            tableData={[
                                                                ["ko hiển thị", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                            ]}
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </TabPane>
                                    <TabPane tabId="plainTabs3">
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card>
                                                    <CardBody>
                                                        <Table
                                                            tableHeaderColor="primary"
                                                            tableHead={["ảnh", "tên mặt hàng", "mô tả", "giá tiền", "số lượng", "lựa chọn"]}
                                                            tableData={[
                                                                ["ko hiển thị", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                            ]}
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </TabPane>
                                    <TabPane tabId="plainTabs4">
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <Card>
                                                    <CardBody>
                                                        <Table
                                                            tableHeaderColor="primary"
                                                            tableHead={["ảnh", "tên mặt hàng", "mô tả", "giá tiền", "số lượng", "lựa chọn"]}
                                                            tableData={[
                                                                ["ko hiển thị", "sữa chua xay đá", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                                ["xxx", "cà phê trứng", "cà phê được thêm trứng gà", "50000", "0", "thêm, xóa"],
                                                            ]}
                                                        />
                                                    </CardBody>
                                                </Card>
                                            </GridItem>
                                        </GridContainer>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Button className="btn-1 ml-1" color="success" type="button">
                    Tổng cộng :
                </Button>
                <Button
                    className="btn-1 btn-neutral ml-1"
                    color="default"
                    type="button"
                >
                    0Đ
                </Button>
            </>
        );
    }
}

export default Items;
