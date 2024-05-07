import { ButtonBase, Grid, Typography } from "@mui/material";
import React from "react";
import plumb from "../../../assets/icons8-plumbing-94.png";
import chem from "../../../assets/Chem.png";
import hardware from "../../../assets/Tools.png";
import steel from "../../../assets/Beam.png";
import nut from "../../../assets/NutAndBolt.png";
import electrical from "../../../assets/Disconnected.png";
import other from "../../../assets/More.png";
import { useNavigate } from "react-router-dom";
import { useIsUserLoggedIn } from "../../../hooks/authentication";

export default function Inventory() {
  useIsUserLoggedIn();

  const naviagte = useNavigate();
  const categories = [
    {
      name: "Hardware",
      icon: hardware,
      path: "/inventory/hardware",
      category: "HARDWARE",
    },
    {
      name: "Chemical",
      icon: chem,
      path: "/inventory/chemical",
      category: "CHEMICAL",
    },
    {
      name: "Steel",
      icon: steel,
      path: "/inventory/steel",
      category: "STEEL",
    },
    {
      name: "Pvc",
      icon: plumb,
      path: "/inventory/pvc",
      category: "PVC",
    },
    {
      name: "Electrical",
      icon: electrical,
      path: "/inventory/electrical",
      category: "ELECTRICAL",
    },
    {
      name: "Bolt & Nut",
      icon: nut,
      path: "/inventory/bolt&nut",
      category: "BOLT&NUT",
    },
    {
      name: "Plumbing",
      icon: plumb,
      path: "/inventory/plumbing",
      category: "PLUMBING",
    },
    {
      name: "Other",
      icon: other,
      path: "/inventory/other",
      category: "OTHER",
    },
  ];

  const navigation = (item) => {
    naviagte(item?.path, {
      state: { name: item.name, category: item.category },
    });
  };

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
              onClick={() => navigation(item)}
            >
              <div className="d-flex flex-column align-items-center">
                <img src={item.icon} />
                <Typography
                  sx={{
                    fontSize: "20px",
                    marginTop: "20px",
                    fontFamily: "roboto",
                    fontWeight: "500",
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
