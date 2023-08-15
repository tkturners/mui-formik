import React from 'react';
import { useFormikContext } from 'formik';
import _ from 'lodash';

// import { Alert } from 'reactstrap'
// import { AlertCircle } from 'react-feather'
// eslint-disable-next-line react/prop-types
function AppFormErrorMessage({ name, alwaysShow = false }) {
  const { errors, touched } = useFormikContext();
  const fieldError = _.get(errors, name);

  const err = Boolean(fieldError && _.isString(fieldError)) && (
    <div style={{ marginTop: 1 }}>
      <div style={{ color: 'red' }}>
        <span style={{ fontSize: 12 }} className="ml-1">
          {fieldError}
        </span>
      </div>
    </div>
  );

  if (alwaysShow) {
    if (fieldError && _.isString(fieldError)) {
      return err;
    }
    return null;
  }
  if (touched[name] && fieldError && _.isString(fieldError)) {
    return err;
  }
  return null;
}

export default AppFormErrorMessage;
