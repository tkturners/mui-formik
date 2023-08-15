import React from "react";
import { useFormikContext } from "formik";
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from "classnames";
import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import _ from "lodash";

interface Props {
  name: string;
  label: string;
}

export default function AppDatePicker({ name, label, ...otherProps }: Props) {
  const { setFieldValue, values, touched, errors } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);
  const val = _.get(values, name);

  return (
    <Stack>
      <DatePicker
        label={label}
        value={val}
        sx={{
          color: "orange",
          fontWeight: 400,
          ...(fieldError && isTouched
            ? {
                backgroundColor: "#FFF2EF !important",
                color: "#FF5A35 !important",
              }
            : {}),
        }}
        onChange={(newValue) => setFieldValue(name, newValue, true)}
        className={classnames({ "is-invalid": isTouched && fieldError })}
        {...otherProps}
      />

      {isTouched && fieldError ? (
        <Typography
          color="#FF5630"
          variant="caption"
          display="block"
          gutterBottom
        >
          {fieldError}
        </Typography>
      ) : (
        ""
      )}
    </Stack>
  );
}
