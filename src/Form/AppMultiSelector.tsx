import React from "react";
import { useFormikContext } from "formik";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  Checkbox,
} from "@mui/material";
import Select, { SelectProps } from "@mui/material/Select";
import _ from "lodash";

export interface AppSelectOptions {
  label: string;
  value: any;
}

interface Props extends SelectProps {
  name: string;
  label: string;
  multiple?: boolean;
  options: AppSelectOptions[];
  required?: boolean;
}

export default function AppMultiSelector({
  multiple,
  name,
  label,
  options = [],
  required,
  ...otherProps
}: Props) {
  const { errors, touched, getFieldProps, values } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  const val = _.get(values, name);
  const selectedValues = Array.isArray(val) ? val : [];

  return (
    <FormControl fullWidth variant="filled">
      <InputLabel id={`select-${name}`}>
        {label}{" "}
        {required && (
          <Typography sx={{ color: "red" }} component="span">
            *
          </Typography>
        )}
      </InputLabel>
      <Select
        multiple
        labelId={`select-${name}`}
        label={label}
        {...getFieldProps(name)}
        value={selectedValues}
        sx={{ borderRadius: "0px" }}
        renderValue={(selected: any) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip
                key={value}
                label={options.find((obj) => obj.value === value)?.label}
                sx={{ height: "20px", borderRadius: "2px" }}
              />
            ))}
          </Box>
        )}
        error={Boolean(fieldError) && isTouched}
        {...otherProps}
      >
        {options.map((single, i) => (
          <MenuItem key={i} value={single.value}>
            <Checkbox checked={selectedValues.indexOf(single.value) > -1} />
            {single.label || single.value}
          </MenuItem>
        ))}
      </Select>
      {isTouched && fieldError && (
        <Typography
          color="#FF5630"
          variant="caption"
          display="block"
          gutterBottom
        >
          {fieldError}
        </Typography>
      )}
    </FormControl>
  );
}
