import React from 'react';
/* eslint-disable react/prop-types */
import { Input, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

export default function AppSwitchInput({
  name,
  label,
  className,
  style,
  inputStyle,
  ...otherProps
}) {
  const { errors, touched, setFieldValue, values } = useFormikContext();

  return (
    <div className={`my-2, ${className} d-flex`} style={style}>
      <span className={`${inputStyle}`}>
        {label && <Typography>{label}</Typography>}
        <Input
          type="switch"
          id={name}
          required
          defaultChecked={values[name]}
          onChange={(e) => {
            setFieldValue(name, !values[name], true);
          }}
        />
      </span>
      <Typography color="#FF5630" variant="caption" display="block" gutterBottom>
        {errors.length > 0 && touched[name] ? errors[name] : null}
      </Typography>
    </div>
  );
}
