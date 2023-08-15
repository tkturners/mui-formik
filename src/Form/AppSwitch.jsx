import React from 'react';
/* eslint-disable react/prop-types */
import { Stack, Switch, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

export default function AppSwitch({ name, label }) {
  const { errors, touched, setFieldValue, values } = useFormikContext();


  return (
    <Stack direction="row-reverse" alignItems="center">
      {label && <Typography>{label}</Typography>}
      <Switch
        checked={values[name]}
        onChange={(e) => {
          setFieldValue(name, !values[name], true);
        }}
      />
      <Typography color="#FF5630" variant="caption" display="block" gutterBottom>
        {errors.length > 0 && touched[name] ? errors[name] : null}
      </Typography>
    </Stack>
  );
}
