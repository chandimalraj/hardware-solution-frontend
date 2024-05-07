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

export default function SalesReps() {
  const location = useLocation();
  console.log(location?.state?.name);
  useIsUserLoggedIn();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const naviagte = useNavigate();
  const addItem = () => {
    naviagte("/sales-reps/sales-rep-add", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action:DEF_ACTIONS.ADD
      },
    });
  };
  const editItem = () => {
    const item = data.find((item)=>
      item.id == selected[0]
    )
    naviagte("/sales-reps/sales-rep-edit", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action:DEF_ACTIONS.EDIT,
        data:item
      },
    });
  };

  const viewItem = () => {
    const item = data.find((item)=>
      item.id == selected[0]
    )
    naviagte("/sales-reps/sales-rep-view", {
      state: {
        name: location?.state?.name,
        category: location?.state?.category,
        action:DEF_ACTIONS.VIEW,
        data:item
      },
    });
  };

  const { addSnackBar } = useSnackBars();
  

  useEffect(() => {getSaleReps()}, []);

  const getSaleReps = async () => {
    try {
      const response = await getAllSalesReps(onSuccess,onError);
      setData(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Sales Reps Fetched Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
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

            <Button disabled={selected.length < 1}>
              <Delete />
              Delete
            </Button>
          </ButtonGroup>
        </Box>

        <Table
          data={data}
          onRowSelect={(row) => {
            console.log(row)
            setSelected(row);
          }}
        />
      </Paper>
    </div>
  );
}
