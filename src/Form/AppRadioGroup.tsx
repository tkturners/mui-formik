import React from "react";
// form
import { useFormikContext } from "formik";
// @mui
import {
  Radio,
  RadioGroup,
  FormControl,
  RadioGroupProps,
  Typography,
  FormControlLabel,
} from "@mui/material";
import _ from "lodash";

// ----------------------------------------------------------------------

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
};

export default function AppRadioGroup({ name, options, ...rest }: Props) {
  const { errors, touched, getFieldProps } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  return (
    <FormControl>
      <RadioGroup {...rest} {...getFieldProps(name)}>
        {options.map((p) => (
          <FormControlLabel
            value={p?.value}
            control={<Radio />}
            label={p?.label}
          />
        ))}
      </RadioGroup>
      {isTouched && isTouched && (
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
