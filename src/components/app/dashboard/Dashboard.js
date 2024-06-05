import React from "react";
import { useIsUserLoggedIn } from "../../../hooks/authentication";
import { Grid, Paper } from "@mui/material";
import Card from "./cardComponent/Card";

export default function Dashboard() {
  useIsUserLoggedIn();
  return (
    <div className="w-100 p-3 pt-5 mt-4">
      <Paper sx={{ height: 600, padding: 5 }}>
        <Grid container columnSpacing={5} rowSpacing={5}>
          <Grid item lg={4}>
            <Card
              name={"sales rep name"}
              pendingSalesTotal={"300000.00"}
              activeSalesTotal={"500000.00"}
            />
          </Grid>
          <Grid item lg={4}>
            <Card
              name={"sales rep name"}
              pendingSalesTotal={"300000.00"}
              activeSalesTotal={"500000.00"}
            />
          </Grid>
          <Grid item lg={4}>
            <Card
              name={"sales rep name"}
              pendingSalesTotal={"300000.00"}
              activeSalesTotal={"500000.00"}
            />
          </Grid>
          <Grid item lg={4}>
            <Card
              name={"sales rep name"}
              pendingSalesTotal={"300000.00"}
              activeSalesTotal={"500000.00"}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
