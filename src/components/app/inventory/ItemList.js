import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Add, Delete, Edit, Vrpano } from "@mui/icons-material";
import { colors } from "../../../utils/constants/colors";
import SearchBar from "./searchBar/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsUserLoggedIn } from "../../../hooks/authentication";
import {
  deleteItemById,
  getAllItems,
  getAllItemsByCategory,
  getItemsByName,
} from "../../../services/itemService";
import { DEF_ACTIONS } from "../../../utils/constants/actions";
import { useSnackBars } from "../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../utils/constants/snackBarTypes";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ConfirmationDialog from "../../confirmation/ConfirmationDialog";

export default function () {
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
    "Are you sure you want to delete this item "
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
    const item = data.find((item) => item.id == selected[0]);
    naviagte("/inventory/item-view", {
      state: {
        name: location?.state?.name,
        //category: location?.state?.category,
        action: DEF_ACTIONS.VIEW,
        item: item,
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
    getItems();
  }, [page]);

  const getItems = async () => {
    try {
      const response = await getAllItemsByCategory(
        location?.state?.category,
        page,
        pageSize,
        onSuccess,
        onError
      );
      setData(response.data.data);
      setTotalPages(response.data.totalPages)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (e,newPage)=>{
     setPage(newPage)
  }

  const search = async (e) => {
    try {
      const response = await getItemsByName(e, location?.state?.category);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToCategories = () => {
    naviagte("/inventory");
  };

  const deleteItem = async () => {
    try {
      const response = await deleteItemById(
        selected[0],
        onSuccessDelete,
        onErrorDelete
      );
      getItems()
      handleDialogClose()
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessDelete = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Item deleted Successfully",
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
    <div className="w-100 p-3 pt-5 mt-4" style={{ overflowX:"hidden" }}>
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            marginBottom: 1,
            display: "flex",
            height: 45,
          }}
        >
          <Button
            sx={{ border: "Highlight" }}
            onClick={goToCategories}
            variant="contained"
          >
            <KeyboardDoubleArrowLeftIcon />
            BACK
          </Button>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              marginBottom: 1,
              color: "white",
              fontFamily: "Roboto",
              backgroundColor: colors.main,
              padding: 1,
              borderRadius: 1,
              height: 45,
              marginLeft: 2,
            }}
          >
            {location?.state?.name}
            {" Items"}
          </Typography>
        </Box>

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
          <SearchBar search={search} />
        </Box>

        <Table
          data={data}
          onRowSelect={(row) => {
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
        ConfirmAction={deleteItem}
        handleClose={handleDialogClose}
      />
    </div>
  );
}
