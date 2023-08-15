import React from "react";
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Chip, Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import { fileData } from "../components/file-thumbnail";

interface AppSimpleUploadFilePropTypes {
  name: string;
  label?: string;
  multiple?: boolean;
}

const AppSimpleUploadFile = ({
  name,
  label,
  multiple,
}: AppSimpleUploadFilePropTypes) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  let val = _.get(values, name);
  if (multiple && typeof val === "string") {
    val = val ? [val] : [];
  } else if (!multiple && _.isArray(val)) {
    val = val[0];
  }

  const onchange = (event: any) => {
    const { files } = event.target;

    if (multiple) {
      setFieldValue(name, [...(val || []), ...files], true);
    } else {
      setFieldValue(name, files[0], true);
    }
  };

  const value = multiple
    ? (val || []).map((__: any) => (__?.file ? __?.file : __), ...val)
    : val;

  const handleDelete = (e: any): void => {
    const afterFilter = val.filter((file: any) => {
      if (file.file) {
        return !_.isEqual(e, file.file);
      }
      return !_.isEqual(e, file);
    });
    setFieldValue(name, afterFilter, true);
  };

  return (
    <>
      <input
        id={`attachment-input-${name}`}
        type="file"
        multiple={multiple}
        onChange={onchange}
        style={{ display: "none" }}
      />
      <label htmlFor={`attachment-input-${name}`}>
        <Button
          variant="text"
          color="primary"
          component="span"
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M0 17.143V24h24v-6.857zm5.143 5.143H1.714v-1.714h3.429zm12-17.143h-3.429v8.571h-3.429V5.143H6.856L11.999 0z"
              />
            </svg>
          }
          sx={{
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Upload Attachments{" "}
        </Button>
      </label>
      <Stack
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "baseline",
        }}
        rowGap={1}
        columnGap={1}
      >
        {value.map((file: any) => {
          const { key, name: title } = fileData(file);
          return (
            <Chip
              key={key}
              label={title}
              onDelete={() => handleDelete(file)}
              sx={{
                border: "2px dashed #ffab00",
                backgroundColor: "lightyellow",
                borderRadius: 0,
                ".MuiChip-deleteIcon": {
                  color: "red",
                },
                ".MuiChip-deleteIcon:hover": {
                  color: "red",
                },
              }}
            />
          );
        })}
      </Stack>
      {fieldError && (
        <Typography
          color="#FF5630"
          variant="caption"
          display="block"
          gutterBottom
        >
          {fieldError}
        </Typography>
      )}
    </>
  );
};

export default AppSimpleUploadFile;
