import React from "react";
/* eslint-disable import/no-extraneous-dependencies */
import { Stack } from "@mui/system";
import { EditorProps } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
import { useFormikContext } from "formik";
import _ from "lodash";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const AppRichTextEditor = ({ name }: any) => {
  const { errors, touched, getFieldProps, values, setFieldValue } =
    useFormikContext();

  const val = _.get(values, name);
  const fieldError = _.get(errors, name);
  const isTouched = _.get(touched, name);

  const handleChange = (e: any) => {
    setFieldValue(name, e, true);
  };

  return (
    <Stack
      sx={{
        border: "1px solid #e3e3e3",
        borderRadius: "9px",
        display: "flex !important",
      }}
    >
      <Editor
        editorState={val}
        toolbarClassName="toolbarClassName"
        toolbarStyle={{ display: "flex", padding: "10px", gap: "10px" }}
        toolbar={{
          options: [
            "blockType",
            "inline",
            "fontFamily",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inline: undefined,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
          },
        }}
        editorStyle={{
          height: "200px",
          borderTop: "1px solid #e3e3e3",
          width: "100%",
          padding: "10px",
        }}
        placeholder="Full Description"
        onEditorStateChange={(e) => handleChange(e)}
      />
    </Stack>
  );
};

export default AppRichTextEditor;
