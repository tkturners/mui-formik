import React from "react";
import { useFormikContext } from "formik";
import _ from "lodash";
import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { SelectProps } from "@mui/material/Select";

export interface AppSelectOptions {
  label: string;
  value: any;
}

interface Props extends SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: AppSelectOptions[];
}

export default function AppAutoCompleter({
  placeholder,
  name,
  label,
  options,
  ...otherProps
}: Props) {
  const { errors, touched, getFieldProps, values, setFieldValue } =
    useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  const val = _.get(values, name);

  const oValue = options.find((i: any) => i?.value === val);

  return (
    <FormControl fullWidth variant="filled">
      <Autocomplete
        {...getFieldProps(name)}
        id="tags-filled"
        options={options}
        autoHighlight
        getOptionLabel={(option: any) => option.label || ""}
        renderOption={(props, option) => (
          <Box
            key={option.value}
            value={option.value}
            component="li"
            {...props}
          >
            {option.label}
          </Box>
        )}
        value={oValue}
        onChange={(event: any, newValue) =>
          // @ts-ignore
          setFieldValue(name, newValue?.value, true)
        }
        onError={Boolean(fieldError) && isTouched}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={Boolean(fieldError) && isTouched}
            sx={{
              ...(fieldError && isTouched
                ? {
                    backgroundColor: "#FFF2EF !important",
                    color: "#FF5A35 !important",
                  }
                : {
                    backgroundColor: "rgba(145, 158, 171, 0.08)",
                    border: "0px !important",
                  }),
            }}
          />
        )}
        // {...otherProps}
      />

      {fieldError && isTouched && (
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
