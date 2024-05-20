import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Add, Category, Edit } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PhotoCamera } from "@mui/icons-material";
import { useIsUserLoggedIn } from "../../../../hooks/authentication";
import { DEF_ACTIONS } from "../../../../utils/constants/actions";
import { useSnackBars } from "../../../../context/SnackBarContext";
import { SnackBarTypes } from "../../../../utils/constants/snackBarTypes";
import { createItem, editItem } from "../../../../services/itemService";
import { createCustomer, editCustomer } from "../../../../services/customerService";

export default function CustomerForm() {
  //const location = useLocation();
  useIsUserLoggedIn();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [form, setForm] = useState();

  const [formData, setFormData] = useState(state?.data);

  function goBack() {
    navigate(-1); // This will navigate back in the history stack
  }

  const handleChange = (value, target) => {
    setFormData((current = {}) => {
      let newData = { ...current };
      newData[target] = value;
      return newData;
    });
  };

  const { addSnackBar } = useSnackBars();

  const onSuccess = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Customer Created Successfully",
    });
  };
  const onError = () => {
    addSnackBar({
      type: SnackBarTypes.error,
      message: "There is an error",
    });
  };

  const submitForm = async () => {
    try {
      const response = await createCustomer(formData, onSuccess, onError);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessEdit = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Customer Updated Successfully",
    });
  };

  const submitEditItem = async () => {
    try {
      const response = await editCustomer(formData, onSuccessEdit, onError);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 p-3 pt-5 mt-4">
      <Paper sx={{ padding: 2, height: 600 }}>
        <IconButton
          sx={{
            minWidth: 10,
            //   mr: open ? 3 : "auto",
            justifyContent: "center",
            color: "#e5e4e2",
            backgroundColor: "#035CA1",
            marginBottom: 2,
            "&:hover": {
              backgroundColor: "#035CA1", // Change this value to your desired hover background color
            },
          }}
          onClick={goBack}
        >
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: "column", width: 75 }}>
          {state?.action == DEF_ACTIONS.ADD && (
            <Button
              sx={{ border: "Highlight" }}
              variant="contained"
              onClick={submitForm}
            >
              <Add />
              ADD
            </Button>
          )}
          {state?.action == DEF_ACTIONS.EDIT && (
            <Button
              sx={{ border: "Highlight" }}
              variant="contained"
              onClick={submitEditItem}
            >
              <Edit />
              EDIT
            </Button>
          )}
        </Box>
        <Grid container sx={{ marginTop: 3 }}>
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Customer Name</FieldName>
              <TextField
                name="customer_name"
                id="customer_name"
                value={formData?.customer_name || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "customer_name")
                }
                type="text"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Customer Address</FieldName>
              <TextField
                name="customer_address"
                id="customer_address"
                value={formData?.customer_address || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "customer_address")
                }
                type="text"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export const FieldName = styled(Typography)`
  && {
    font-size: 13px;

    margin: 10px 0;
  }
`;

export const FieldWrapper = styled(Stack)`
  && {
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 0px;
    padding: 0px 10px;
  }
`;
