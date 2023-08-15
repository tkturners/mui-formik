import React from "react";
import { useFormikContext } from "formik";
import {
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import _ from "lodash";
// icons

interface Props extends StandardTextFieldProps {
  name: string;
  label: ReactNode;
  tagUser?: string;
  hasReply?: boolean;
  required?: boolean;
}

export default function AppInputField({
  name,
  label,
  type,
  InputProps,
  required,
  ...otherProps
}: Props) {
  const { errors, getFieldProps, touched, values }: any = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const errorStyles = {
    borderColor: "red",
    ".css-ofqx2f-MuiFormHelperText-root.Mui-error": {
      marginLeft: "0px !important",
    },
    // Add more styles as needed
  };

  const nonErrorStyles = {
    // Add styles for non-error state
  };

  return (
    <TextField
      {...getFieldProps(name)}
      fullWidth
      label={
        required ? (
          <>
            {label}
            <Typography sx={{ color: "red", pl: 0.5 }} component="span">
              *
            </Typography>
          </>
        ) : (
          label
        )
      }
      error={Boolean(fieldError) && isTouched}
      sx={{
        ".Mui-error": {
          m: 0,
          mt: 0,
        },
        ".MuiFormLabel-root": {
          top: "-10px",
        },
        ".MuiInputLabel-shrink": {
          top: 0,
        },
        ".MuiFormLabel-asterisk": {
          color: "red",
        },
      }}
      helperText={isTouched && fieldError}
      // eslint-disable-next-line no-nested-ternary
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <circle cx="16" cy="16" r="4" fill="currentColor" />
                        <path
                          fill="currentColor"
                          d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M30.94 15.66a16.4 16.4 0 0 0-5.73-7.45L30 3.41L28.59 2L2 28.59L3.41 30l5.1-5.09A15.38 15.38 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68zM16 22.5a6.46 6.46 0 0 1-3.83-1.26L14 19.43A4 4 0 0 0 19.43 14l1.81-1.81A6.49 6.49 0 0 1 16 22.5zm-11.47-.69l5-5A6.84 6.84 0 0 1 9.5 16A6.51 6.51 0 0 1 16 9.5a6.84 6.84 0 0 1 .79.05l3.78-3.77A14.39 14.39 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68a15.86 15.86 0 0 0 3.47 5.47z"
                        />
                      </svg>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : InputProps
      }
      {...otherProps}
    />
  );
}
