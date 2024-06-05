import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Checkbox, Pagination } from "@mui/material";
//import { Colors } from "../../../utils/constants/Colors";
//
import { styled } from "@mui/material/styles";
import theme from "../../../../utils/theme/theme.json";
import { colors } from "../../../../utils/constants/colors";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function customCheckbox(theme) {
  return {
    "& .MuiCheckbox-root svg": {
      width: 22,
      height: 22,
      backgroundColor: "transparent",
      border: `1px solid red`,
      border: "none",
      color: "#7BA6C9",
    },
    "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
      backgroundColor: "transparent",
      color: "#7BA6C9",
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  width: "100%",
  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#B7CBDD",
    //borderRadius: "10px",
    //border: "1px solid " + colors.main,

    "&:hover": {
      backgroundColor: colors.main,
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: colors.main,
      marginTop: "-2px",
      marginBottom: "2px",
      zIndex: 20,
      //boxShadow: Colors.shadow,
      cursor: "pointer",
    },
    transition: "all 0.3s ease",
    border: `1px solid #CCC`,
    borderBottom: `none`,
  },
  " .MuiDataGrid-cell": {
    borderRight: `1px solid #CCC`,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: colors.main,
    color: "white",
    fontSize: "15px",
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    // borderTop: `1px solid #CCC`,
    fontSize: "15px",
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiDataGrid-cell:focus": {
    outline: "none", // Remove focus outline on cells
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .css-axafay-MuiDataGrid-virtualScroller": {
    overflow: "hidden",
  },

  ...customCheckbox(theme),
}));

export default function Table({
  onRowSelect = (_c) => {},
  data = [],
  page,
  totalpages,
  handlePageChange,
}) {
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleDateString();
  };

  const cellStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const columns = [
    {
      field: "customer_name",
      headerName: "Name",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customer_address",
      headerName: "Address",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customer_code",
      headerName: "Code",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 130,

      //headerClassName: "super-app-theme--header",
      cellStyle: cellStyle,
    },
    {
      field: "area",
      headerName: "Area",
      width: 150,
      flex: 1,
      //headerClassName: "super-app-theme--header",
      cellStyle: cellStyle,
    },
  ];

  const getRowHeight = () => 40;

  return (
    <div style={{ height: 550, width: "100%" }}>
      <Box
        sx={{
          height: 500,
          width: "99%",
        }}
      >
        <StyledDataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          disableSelectionOnClick
          onRowSelectionModelChange={onRowSelect}
          getRowHeight={getRowHeight}
        />
        <Pagination
          count={totalpages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          sx={{ mt: -1 }}
        />
      </Box>
    </div>
  );
}
