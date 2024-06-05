import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { Box, Button, ButtonGroup, Paper } from "@mui/material";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { colors } from "../../../utils/constants/colors";
// import SearchBar from "./searchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsUserLoggedIn } from "../../../hooks/authentication";
import { getAllSalesReps } from "../../../services/salesRepService";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import { useSnackBars } from "../../../context/SnackBarContext";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import {
  deleteCustomerById,
  getAllCustomers,
  getCustomersByAreas,
  getCustomersByName,
} from "../../../services/customerService";
import SearchBar from "./searchBar/SearchBar";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";
import MultipleSelectChip from "./customerFilter/CustomerFilterByAreas";

export default function Customers() {
  const location = useLocation();
  console.log(location?.state?.name);
  useIsUserLoggedIn();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages , setTotalPages] = useState(10)
  const [open, setOpen] = useState(false);
  const [confMsg, setConfMsg] = useState(
    "Are you sure you want to delete this customer "
  );
  const naviagte = useNavigate();
  const addItem = () => {
    naviagte("/customers/customer-add", {
      state: {
        action: DEF_ACTIONS.ADD,
      },
    });
  };
  const editItem = () => {
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/customers/customer-edit", {
      state: {
        action: DEF_ACTIONS.EDIT,
        data: item,
      },
    });
  };

  const viewItem = () => {
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/customers/customer-view", {
      state: {
        action: DEF_ACTIONS.VIEW,
        data: item,
      },
    });
  };

  const { addSnackBar } = useSnackBars();

  useEffect(() => {
    getCustomers();
  }, [page]);

  const getCustomers = async () => {
    try {
      const response = await getAllCustomers(page,pageSize, onSuccess, onError);
      setData(response.data.data);
      setTotalPages(response.data.totalPages)
      
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Customers Fetched Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
  };

  const searchCustomers = async (name) => {
    try {
      const response = await getCustomersByName(name);
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async () => {
    try {
      const response = await deleteCustomerById(
        selected,
        onSuccessDelete,
        onErrorDelete
      );
      getCustomers();
      handleDialogClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Customer Is Deleted Successfully",
    });
  };
  const onErrorDelete = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
  };

  const filterCustomers = async (areas) => {
    try {
      const response = await getCustomersByAreas(areas);
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handlePageChange = (e,newPage)=>{
    setPage(newPage)
 }
  return (
    <div className="w-100 p-3 pt-5 mt-4">
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            marginBottom: 1,
            display: "flex",
            height: 45,
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
            <Button sx={{ border: "Highlight" }} onClick={addItem}>
              <Add />
              ADD
            </Button>

            <Button disabled={selected.length !== 1} onClick={editItem}>
              <Edit />
              Edit
            </Button>

            <Button disabled={selected.length !== 1} onClick={viewItem}>
              <Vrpano />
              View
            </Button>

            <Button disabled={selected.length < 1} onClick={handleDialogOpen}>
              <Delete />
              Delete
            </Button>
          </ButtonGroup>
          <SearchBar search={searchCustomers} />
          <MultipleSelectChip filterCustomers={filterCustomers}/>
        </Box>

        <Table
          data={data}
          onRowSelect={(row) => {
            console.log(row);
            setSelected(row);
          }}
          totalpages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      </Paper>
      <ConfirmationDialog
        open={open}
        confirmMsg={confMsg}
        ConfirmAction={deleteCustomer}
        handleClose={handleDialogClose}
      />
    </div>
  );
}
