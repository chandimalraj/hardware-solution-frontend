import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Groups2Icon from "@mui/icons-material/Groups2";

export const Menu = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    name: "Inventory",
    icon: <InventoryIcon />,
    link: "/inventory",
    subPaths: [
      "/inventory/hardware",
      "/inventory/chemical",
      "/inventory/steel",
      "/inventory/electrical",
      "/inventory/bolt&nut",
      "/inventory/plumbing",
      "/inventory/other",
      "/chemical",
      "/inventory/item-add",
      "/inventory/item-edit",
      "/inventory/item-view",
    ],
  },
  {
    name: "Orders",
    icon: <LocalShippingIcon />,
    link: "/orders",
  },
  {
    name: "Sales Reps",
    icon: <PeopleAltIcon />,
    link: "/sales-reps",
    subPaths: [
      "/sales-reps/sales-rep-add",
      "/sales-reps/sales-rep-edit",
      "/sales-reps/sales-rep-view",
    ],
  },
  {
    name: "Customers",
    icon: <Groups2Icon />,
    link: "/customers",
    subPaths: [
      "/customers/customer-add",
      "/customers/customer-edit",
      "/customers/customer-view",
    ],
  },
  {
    name: "Invoice",
    icon: <ReceiptIcon />,
    link: "/invoice",
  },
  {
    name: "Invoice List",
    icon: <ListAltIcon />,
    link: "/invoice-list",
  },
];
