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

export default function ItemForm() {
  //const location = useLocation();
  useIsUserLoggedIn();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [selectedImage, setSelectedImage] = useState(
    state?.item?.image_url || null
  );
  const [form, setForm] = useState();

  const [formData, setFormData] = useState(
    state?.item || { category: state?.category }
  );

  function goBack() {
    navigate(-1); // This will navigate back in the history stack
  }
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    //const form = new FormData();
    //form.append("file", file);
    setForm(file);
  };

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
      message: "Item Created Successfully",
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
      const formDataNew = new FormData();
      formDataNew.append("file", form);
      formDataNew.append("name", formData?.name);
      formDataNew.append("category", formData?.category);
      formDataNew.append("price", formData?.price);
      formDataNew.append("quantity", formData?.quantity);
      formDataNew.append("image_url", "");

      console.log(formDataNew);

      const response = await createItem(formDataNew, onSuccess, onError);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSuccessEdit = () => {
    addSnackBar({
      type: SnackBarTypes.success,
      message: "Item Updated Successfully",
    });
  };

  const submitEditItem = async () => {
    try {
      const formDataNew = new FormData();
      formDataNew.append("file", form);
      formDataNew.append("id", formData?.id);
      formDataNew.append("name", formData?.name);
      formDataNew.append("category", formData?.category);
      formDataNew.append("price", formData?.price);
      formDataNew.append("quantity", formData?.quantity);
      formDataNew.append("image_url", formData?.image_url);

      console.log(formDataNew);
      const response = await editItem(formDataNew, onSuccessEdit, onError);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-100 p-3 pt-5 mt-4">
      <Paper sx={{ padding: 2, height: 600 }}>
        {/* <IconButton
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
        </IconButton> */}

        <Box sx={{ display: "flex", flexDirection: "row" ,height:40}}>
          <Button sx={{ border: "Highlight" }} variant="contained" onClick={goBack}>
          <KeyboardDoubleArrowLeftIcon />
            BACK
          </Button>
          {state?.action == DEF_ACTIONS.ADD && (
            <Button
              sx={{ border: "Highlight" , marginLeft:1 }}
              variant="contained"
              onClick={submitForm}
              
            >
              <Add />
              ADD
            </Button>
          )}
          {state?.action == DEF_ACTIONS.EDIT && (
            <Button
              sx={{ border: "Highlight", marginLeft:1 }}
              variant="contained"
              onClick={submitEditItem}
            >
              <Edit />
              EDIT
            </Button>
          )}
        </Box>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid item lg={4}>
            <FieldWrapper>
              <FieldName>Item Name</FieldName>
              <TextField
                name="name"
                id="name"
                value={formData?.name || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "name")}
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
          <Grid item lg={3}>
            <FieldWrapper>
              <FieldName>Category</FieldName>
              <Select
                value={formData?.category || ""}
                disabled
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "category")
                }
                sx={{
                  borderRadius: "8px",
                }}
                size="small"
                fullWidth
              >
                <MenuItem value={"HARDWARE"}>Hardware</MenuItem>
                <MenuItem value={"CHEMICAL"}>Chemical</MenuItem>
                <MenuItem value={"STEEL"}>Steel</MenuItem>
                <MenuItem value={"PVC"}>PVC</MenuItem>
                <MenuItem value={"ELECTRICAL"}>Electrical</MenuItem>
                <MenuItem value={"BOLT&NUT"}>Bolt & Nut</MenuItem>
                <MenuItem value={"PLUMBING"}>Plumbing</MenuItem>
                <MenuItem value={"OTHER"}>Other</MenuItem>
              </Select>
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName>Quantity</FieldName>
              <TextField
                name="quantity"
                id="quantity"
                value={formData?.quantity || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) =>
                  handleChange(e?.target?.value || "", "quantity")
                }
                type="number"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>
          <Grid item lg={2}>
            <FieldWrapper>
              <FieldName>Price</FieldName>
              <TextField
                name="price"
                id="price"
                value={formData?.price || ""}
                fullWidth
                disabled={state?.action === DEF_ACTIONS.VIEW}
                onChange={(e) => handleChange(e?.target?.value || "", "price")}
                type="number"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "8px",
                  },
                }}
                size="small"
              />
            </FieldWrapper>
          </Grid>

          <Grid item lg={8}>
            <FieldWrapper>
              <FieldName>Select Item Picture</FieldName>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="profile-picture-input"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  sx={{ position: "relative" }}
                >
                  <label
                    htmlFor="profile-picture-input"
                    style={{
                      width: "340px",
                      height: "240px",
                      border: "1px solid #7a879d",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton component="span" style={{ zIndex: "2" }}>
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  {selectedImage && (
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        backgroundColor: "rgb(46,125,50,0.1)",
                        width: "140px",
                        height: "140px",
                        borderRadius: "70px",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt="Profile"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "70px",
                        }}
                      />
                    </div>
                  )}
                </Box>
              </div>
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
