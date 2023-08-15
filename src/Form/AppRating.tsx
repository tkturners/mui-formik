import React from "react";
import { Rating, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";

interface AppRatingProps {
  name: string;
  label: string;
}

export default function AppRating({ name, label }: AppRatingProps) {
  const { errors, touched, setFieldValue, values }: any = useFormikContext();

  const val = _.get(values, name);
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);
  const handleChange = (newValue: any) => {
    setFieldValue(name, newValue);
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        {label && <Typography sx={{ mx: 1 }}>{label}</Typography>}
        <Rating
          value={val}
          onChange={(event, newValue: any) => handleChange(newValue)}
          key={val}
        />
      </Stack>
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
    </Stack>
  );
}
