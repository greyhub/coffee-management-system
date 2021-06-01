import Dashboard from "@material-ui/icons/Dashboard";
import DashboardPage from "views/Dashboard/Dashboard.js";
import EmployeesManager from "views/EmployeesManagement/EmployeesManagement.js"
import BillManagement from 'views/BillManagement/BillManagement.js'
import Items from "views/Items/Items.js";
import Statistics from "views/Statistics/Statistics.js";
import Purchasing from "views/Purchasing/Purchasing.js"
import { Equalizer, LocalCafe, People, Receipt, Store } from "@material-ui/icons";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/employees",
    name: "Nhân viên",
    rtlName: "",
    icon: People,
    component: EmployeesManager,
    layout: "/admin"
  },
  {
    path: "/items",
    name: "Mặt hàng",
    rtlName: "",
    icon: LocalCafe,
    component: Items,
    layout: "/admin"
  },
  {
    path: "/purchasing",
    name: "Thu mua",
    rtlName: "",
    icon: Store,
    component: Purchasing,
    layout: "/admin"
  },
  {
    path: "/bill",
    name: "Đơn hàng",
    rtlName: "",
    icon: Receipt,
    component: BillManagement,
    layout: "/admin"
  },
  {
    path: "/statistics",
    name: "Thống kê",
    rtlName: "",
    icon: Equalizer,
    component: Statistics,
    layout: "/admin"
  },
];

export default dashboardRoutes;
