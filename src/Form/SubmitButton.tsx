import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFormikContext } from "formik";

const SubmitButton = ({ children, ...rest }: any) => {
  const { submitForm } = useFormikContext();

  return (
    <LoadingButton
      {...rest}
      type="button"
      onClick={() => {
        submitForm();
      }}
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;
