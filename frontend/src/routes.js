// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import EmployeesManager from "views/EmployeesManagement/EmployeesManagement.js"
import OrderManagement from 'views/OrderManagement/OrderManagement.js'
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Purchasing from "views/Purchasing/Purchasing.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/EmployeesManagement",
    name: "Employees",
    rtlName: "",
    icon: Person,
    component: EmployeesManager,
    layout: "/admin"
  },
  {
    path: "/OrderManagament",
    name: "Order",
    rtlName: "",
    icon: LibraryBooks,
    component: OrderManagement,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/items",
    name: "Items",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/purchasing",
    name: "Purchasing",
    rtlName: "",
    icon: "content_paste",
    component: Purchasing,
    layout: "/admin"
  },
  {
    path: "/bill",
    name: "Bill",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/statistics",
    name: "Statistics",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
];

export default dashboardRoutes;
