import { Box, Typography } from "@mui/material";
import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function Card({ name, pendingSalesTotal, activeSalesTotal }) {
  return (
    <CardComponent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography>{name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Pending Sales </Typography>
        <Typography>{pendingSalesTotal}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Active Sales </Typography>
        <Typography>{activeSalesTotal}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Total Sales</Typography>
        <Typography>{activeSalesTotal}</Typography>
      </Box>
    </CardComponent>
  );
}

// Create a styled button component
const CardComponent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius:'5px',
  boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  
}));
