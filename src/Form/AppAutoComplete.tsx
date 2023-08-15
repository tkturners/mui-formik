import { useFormikContext } from 'formik';
import { Autocomplete, Chip, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

import _ from 'lodash';

export interface AppSelectOptions {
  label: string;
  value: any;
}

interface Props extends SelectProps {
  name: string;
  freeSolo?: boolean;
  label?: string;
  placeholder?: string;
  options: string[];
}

export default function AppAutoComplete({
  freeSolo,
  placeholder,
  name,
  label,
  options = [],
  ...otherProps
}: Props) {
  const { errors, touched, getFieldProps, values, setFieldValue } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  const val = _.get(values, name);

  return (
    <FormControl fullWidth variant="filled">
      <Autocomplete
        {...getFieldProps(name)}
        multiple
        id="tags-filled"
        options={options}
        freeSolo
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        value={val}
        onChange={(event: any, newValue) => {
          setFieldValue(name, newValue, true);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="filled" label={label} placeholder={placeholder} />
        )}
      />

      {fieldError && isTouched && (
        <Typography color="#FF5630" variant="caption" display="block" gutterBottom>
          {fieldError}
        </Typography>
      )}
    </FormControl>
  );
}
