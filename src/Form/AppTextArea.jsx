import React from 'react';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { TextareaAutosize ,TextField,Typography} from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function AppTextArea({ name, label, ...otherProps }) {
  const { errors, getFieldProps, touched } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  return (
  
    <>
     <TextField
     {...getFieldProps(name)}
     fullWidth
    sx={{ width: '100%' }}
    placeholder='Description'
    multiline
    rows={4}
    error={Boolean(fieldError) && isTouched}
   
    label={
      <Typography variant="caption" component="p">
        {label} <span style={{ color: 'red' }}>*</span>
      </Typography>
    }
    />
    {isTouched && isTouched && (
      <Typography
        color="#FF5630"
        sx={{ ml: '0 !important' }}
        variant="caption"
        display="block"
        gutterBottom
      >
        {fieldError}
      </Typography>
    )}
    </>
   
  
  );
}
