import { ChildCare } from "@mui/icons-material";
import Inventory from "../components/app/inventory/Inventory";
import Dashboard from "../components/app/dashboard/Dashboard";
import Login from "../components/login/Login";
import ItemList from "../components/app/inventory/ItemList";
import ItemForm from "../components/app/inventory/itemForm/ItemForm";
import SalesReps from "../components/app/sales-reps/SalesReps";
import SalesRepForm from "../components/app/sales-reps/salesRepForm/SalesRepForm";
import Orders from "../components/app/orders/Orders";
import Customers from "../components/app/customers/Customers";
import CustomerForm from "../components/app/customers/customerForm/customerForm";
import OrderItems from "../components/app/orders/OrderItems";

export const Routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
    children: [
      {
        path: "/",
        element: <Inventory />,
      },
      {
        path: "/hardware",
        element: <ItemList />,
      },
      {
        path: "/hardware",
        element: <ItemList />,
      },
      {
        path: "/chemical",
        element: <ItemList />,
      },
      {
        path: "/steel",
        element: <ItemList />,
      },
      {
        path: "/pvc",
        element: <ItemList />,
      },
      {
        path: "/electrical",
        element: <ItemList />,
      },
      {
        path: "/bolt&nut",
        element: <ItemList />,
      },
      {
        path: "/plumbing",
        element: <ItemList />,
      },
      {
        path: "/other",
        element: <ItemList />,
      },
      {
        path: "/item-add",
        element: <ItemForm />,
      },
      {
        path: "/item-edit",
        element: <ItemForm />,
      },
      {
        path: "/item-view",
        element: <ItemForm />,
      },
    ],
  },
  {
    path: "/sales-reps",
    element: <SalesReps />,
  },
  {
    path: "/sales-reps/sales-rep-add",
    element: <SalesRepForm />,
  },
  {
    path: "/sales-reps/sales-rep-edit",
    element: <SalesRepForm />,
  },
  {
    path: "/sales-reps/sales-rep-view",
    element: <SalesRepForm />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/orders/order-items",
    element: <OrderItems />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/customers/customer-add",
    element: <CustomerForm />,
  },
  {
    path: "/customers/customer-view",
    element: <CustomerForm />,
  },
  {
    path: "/customers/customer-edit",
    element: <CustomerForm />,
  }
];
