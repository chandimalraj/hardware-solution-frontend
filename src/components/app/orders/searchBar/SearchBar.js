import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

export default function SearchBar(props) {
  const { search , field} = props;
  
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 ,marginRight:2}}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        {/* <MenuIcon /> */}
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder= {"Search By " + field}
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(e)=>search(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
