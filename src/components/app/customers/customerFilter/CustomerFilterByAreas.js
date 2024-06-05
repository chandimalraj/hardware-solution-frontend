import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FieldName, FieldWrapper } from "../customerForm/customerForm";

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
      // width: 250,
    },
  },
};

const names = [
  "DAMBULLA",
  "POLONNARUWA",
  "ANURADHAPURA",
  "MONARAGALA",
  "AMPARA",
  "BADULLA",
  "RATNAPURA",
  "GAMPAHA",
  "COLOMBO",
  "MAHIYANGANAYA",
  "CHILLAW",
  "PUTTALAM",
  "JAFFNA",
  "DEHIATTAKANDIYA",
  "SIYAMBALANDUWA",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ filterCustomers }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
   
   
    filterCustomers(JSON.stringify(value))
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl style={{ width: 500, marginLeft: 5 }}>
      <InputLabel id="demo-multiple-chip-label">Filter By Areas</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        onChange={handleChange}
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Filter By Area"
            sx={{ color: "red" }}
          />
        }
        sx={{
          borderRadius: "8px",
          height: 45,
        }}
        multiple
        size="small"
        fullWidth
        value={personName}
        //disabled={state?.action === DEF_ACTIONS.VIEW}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
