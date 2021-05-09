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
import Items from "views/Items/Items.js";
import Statistics from "views/Statistics/Statistics.js";

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
    path: "/employees",
    name: "Employees",
    rtlName: "",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/items",
    name: "Items",
    rtlName: "",
    icon: "content_paste",
    component: Items,
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
    component: Statistics,
    layout: "/admin"
  },
];

export default dashboardRoutes;
