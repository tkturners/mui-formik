/* eslint-disable consistent-return */
import React from "react";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Upload, UploadProps } from "../components/upload";

export const base64toBlob = ({
  b64Data,
  sliceSize = 512,
  forcedMimeType,
}: {
  b64Data: string;
  sliceSize?: number;
  forcedMimeType?: string;
}) => {
  const mimeType =
    forcedMimeType || b64Data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)![0];
  b64Data = b64Data.replace(/^data:.*,/, "");

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    // @ts-ignore
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return blob;
};

export async function blobToBase64(file: any) {
  return new Promise((resolve: any, reject: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      const base64data = reader.result;
      resolve(base64data);
    };
    reader.onerror = function (err) {
      reject(err);
    };
  });
}

interface AppUploadFilePropTypes extends UploadProps {
  name: string;
  label?: string;
}

const AppUploadFile = ({ name, label, ...rest }: AppUploadFilePropTypes) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  let val = _.get(values, name);
  // @ts-ignore
  if (rest.multiple && typeof val === "string") {
    val = val ? [val] : [];
    // @ts-ignore
  } else if (!rest.multiple && _.isArray(val)) {
    val = val[0];
  }
  // eslint-disable-next-line no-nested-ternary
  // @ts-ignore
  const value = rest.multiple
    ? (val || []).map((__: any) => (__?.file ? __?.file : __))
    : val;

  return (
    <>
      <Upload
        {...rest}
        // @ts-ignore
        file={rest.multiple ? undefined : value}
        // @ts-ignore
        files={rest.multiple ? value : undefined}
        error={Boolean(fieldError) && isTouched}
        // @ts-ignore
        disabled={value?.length >= rest?.maxFiles}
        onDrop={async (fileVal: any) => {
          const images = await Promise.all(
            fileVal.map(async (single: File) => ({
              preview: await blobToBase64(single),
              file: single,
            }))
          );
          // @ts-ignore
          if (rest.multiple) {
            // @ts-ignore
            if (value.length >= rest.maxFiles) {
              return;
            }
            setFieldValue(name, [...(val || []), ...images], true);
          } else {
            setFieldValue(name, images[0], true);
          }
        }}
        onDelete={() => {
          // @ts-ignore
          if (rest.multiple) {
            setFieldValue(name, [], true);
          } else {
            setFieldValue(name, "", true);
          }
        }}
        onRemove={(e) => {
          const afterFilter = val.filter((file: any) => {
            if (file.file) {
              return !_.isEqual(e, file.file);
            }
            return !_.isEqual(e, file);
          });
          setFieldValue(name, afterFilter, true);
        }}
      />
      {fieldError && isTouched && (
        <Typography
          color="#FF5630"
          variant="caption"
          display="block"
          gutterBottom
        >
          {fieldError}
        </Typography>
      )}

      {
        // @ts-ignore
        rest.maxFiles && (
          <Typography variant="caption" display="block" gutterBottom>
            Maximum{" "}
            {
              // @ts-ignore
              rest.maxFiles
            }{" "}
            file allowed
          </Typography>
        )
      }
    </>
  );
};

export default AppUploadFile;
