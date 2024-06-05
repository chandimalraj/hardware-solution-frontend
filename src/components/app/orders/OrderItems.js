import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
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
import { getAllOrders, getItemsByOrder } from "../../../services/orderService";
import OrderItemsTable from "./table/OrderItemsTable";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export default function () {
  const location = useLocation();
  console.log(location?.state?.order);
  const order = location?.state?.order
  useIsUserLoggedIn();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [total,setTotal] = useState(0)
  const navigate = useNavigate();

  function goBack() {
    navigate(-1); // This will navigate back in the history stack
  }
  
   const viewItem = () => {
    const item = data.find((item) => item.id == selected[0]);
    navigate("/inventory/item-view", {
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
  }, []);

  const getItems = async () => {
    try {
      const response = await getItemsByOrder(order.id);
      setData(response.data.data.data);
      setTotal(response.data.data.total)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const search = async (e) => {
    try {
      const response = await getItemsByName(e , location?.state?.category);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
          <Button
            sx={{ border: "Highlight" }}
            variant="contained"
            onClick={goBack}
          >
            <KeyboardDoubleArrowLeftIcon />
            BACK
          </Button>
          
          <Typography sx={{ fontFamily:'roboto' ,marginLeft:5 ,fontSize:18,marginTop:1,fontWeight:700}}>
           Order Total Rs
          </Typography>
          <Typography sx={{ fontFamily:'roboto' ,marginLeft:2 ,fontSize:25,color:'red',fontWeight:700}}>
            {parseFloat(total).toFixed(2)}
          </Typography>
          
          
        </Box>

        <OrderItemsTable
          data={data}
          
          onRowSelect={(row) => {
            setSelected(row);
          }}
        />
      </Paper>
    </div>
  );
}
