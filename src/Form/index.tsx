import React, { FC, ReactElement } from 'react';
import { Formik, Form as FormikForm, FormikValues, FormikHelpers } from 'formik';

const Form: FC<{
  initialValues: any;
  validationSchema: any;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  children: ReactElement;
  enableReinitialize?: boolean;
}> = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  // className = '',
  enableReinitialize = false,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    enableReinitialize={enableReinitialize}
  >
    {() => <FormikForm>{children}</FormikForm>}
  </Formik>
);

export default Form;
