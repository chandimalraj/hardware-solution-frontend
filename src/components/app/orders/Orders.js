import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { colors } from "../../../utils/constants/colors";
import SearchBar from "./searchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsUserLoggedIn } from "../../../hooks/authentication";
import {
  getAllItems,
  getAllItemsByCategory,
  getItemsByName,
} from "../../../services/itemService";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import {
  deleteOrderById,
  getAllOrders,
  getOrdersByCustomerCode,
  getOrdersBySalesRepName,
} from "../../../services/orderService";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";

export default function () {
  const location = useLocation();
  console.log(location?.state?.name);
  useIsUserLoggedIn();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [confMsg, setConfMsg] = useState(
    "Are you sure you want to delete this order "
  );


  const naviagte = useNavigate();
  const addItem = () => {
    naviagte("/inventory/item-add", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action: DEF_ACTIONS.ADD,
      },
    });
  };

  const editItem = () => {
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/inventory/item-edit", {
      state: {
        name: location?.state?.name,
        //category: location?.state?.category,
        action: DEF_ACTIONS.EDIT,
        item: item,
      },
    });
  };

  const viewItem = () => {
    const order = data.find((item) => item.id == selected[0]);
    naviagte("/orders/order-items", {
      state: {
        name: location?.state?.name,
        //category: location?.state?.category,
        action: DEF_ACTIONS.VIEW,
        order: order,
      },
    });
  };

  const { addSnackBar } = useSnackBars();

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Items Fetched Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await getAllOrders();
      setData(response?.data?.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchOrdersByCode = async (e) => {
    try {
      if (e.length == 4) {
        const response = await getOrdersByCustomerCode(e);
        setData(response?.data?.data);
        console.log(response);
      }
      if (e.length == 0) {
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchOrdersBySalesRep = async (e) => {
    try {
      const response = await getOrdersBySalesRepName(e);
      setData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async () => {
    try {
      const response = await deleteOrderById(
        selected[0],
        onSuccessDelete,
        onErrorDelete
      );
      getOrders();
      handleDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Order Is Deleted Successfully",
    });
  };
  const onErrorDelete = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className="w-100 p-3 pt-5 mt-4">
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            marginBottom: 1,
            display: "flex",
          }}
        >
          <ButtonGroup
            variant="contained"
            disableElevation
            size="small"
            aria-label="action button group"
            sx={{
              //color:colors.main,
              marginRight: 5,
            }}
          >
            <Button disabled={selected.length !== 1} onClick={viewItem}>
              <Vrpano />
              View
            </Button>

            <Button disabled={selected.length < 1} onClick={handleDialogOpen}>
              <Delete />
              Delete
            </Button>
          </ButtonGroup>
          <SearchBar search={searchOrdersByCode} field="customer code" />
          <SearchBar search={searchOrdersBySalesRep} field="sales rep" />
          <Button variant="contained" color="success" sx={{ 

           }} disabled={selected.length !== 1} size="small">
              
              set accepted
            </Button>
        </Box>

        <Table
          data={data}
          onRowSelect={(row) => {
            setSelected(row);
          }}
        />
      </Paper>
      <ConfirmationDialog
        open={open}
        confirmMsg={confMsg}
        ConfirmAction={deleteOrder}
        handleClose={handleDialogClose}
      />
    </div>
  );
}
