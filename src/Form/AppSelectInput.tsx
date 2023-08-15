import React from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import Select, { SelectProps } from "@mui/material/Select";
import _ from "lodash";

export interface AppSelectOptions {
  label: string;
  value: any;
}

interface Props extends SelectProps {
  name: string;
  label: string;
  options: AppSelectOptions[];
  required?: boolean;
}

export default function AppSelectInput({
  name,
  label,
  required,
  options = [],
  ...otherProps
}: Props) {
  const { errors, touched, getFieldProps, values } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  const val = _.get(values, name);

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
        labelId={`select-${name}`}
        label={label}
        {...getFieldProps(name)}
        value={val}
        error={Boolean(fieldError) && isTouched}
        {...otherProps}
      >
        {options.map((single, i) => (
          <MenuItem key={i} value={single.value}>
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
