import { ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import plumb from "../../../assets/icons8-plumbing-94.png";
import chem from "../../../assets/icons8-chemical-100.png";

export default function Inventory() {
  const categories = [
    {
      name: "Hardware",
      icon: plumb,
    },
    {
      name: "Chemical",
      icon: chem,
    },
    {
      name: "Steel",
      icon: plumb,
    },
    {
      name: "Pvc",
      icon: plumb,
    },
    {
      name: "Electrical",
      icon: plumb,
    },
    {
      name: "Bolt & Nut",
      icon: plumb,
    },
    {
      name: "Plumbing",
      icon: plumb,
    },
    {
        name: "Other",
        icon: plumb,
      },
  ];

  return (
    <div className="mt-5 pt-5 d-flex container-fluid pb-5">
      <Grid
        container
        spacing={2}
        marginTop={0}
        paddingX={10}
        sx={{ height: "auto" }}
      >
        {categories.map((item) => (
          <Grid
            item
            lg={3}
            sx={{
              display: "flex",
            }}
          >
            <ButtonBase
              sx={{
                display: "flex",
                flexDirection: "collumn",
                alignItems: "center",
                backgroundColor: "rgb(255,255,255)",
                width: "100%",
                fontFamily: "Poppins",
                paddingY: "20px",
                fontSize: "15px",
                transition: "all 0.5s ease-in-out",
                "&:hover": {
                  opacity: 1,
                  transform: "scale(1.05)",
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(163,167,171,1) 100%)",
                  color: "white",
                },
              }}
            >
              <div className="d-flex flex-column align-items-center">
                <img src={item.icon} />
                <Typography
                  sx={{
                    fontSize: "20px",
                    marginTop: "20px",
                    fontFamily:"roboto",
                    fontWeight:"500"
                  }}
                >
                  {item.name}
                </Typography>
              </div>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
