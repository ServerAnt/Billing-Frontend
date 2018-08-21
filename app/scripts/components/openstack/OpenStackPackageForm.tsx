import * as React from 'react';

import {
  FormContainer,
  StringField,
  TextField,
  SelectField,
  SecretField
} from '@waldur/form-react';

export const OpenStackPackageForm = () => (
  <form className="form-horizontal">
    <FormContainer
      submitting={false}
      labelClass="col-sm-3"
      controlClass="col-sm-9">
      <StringField
        label="Tenant name"
        name="name"
        required={true}
      />
      <SelectField
        label="VPC package"
        name="package"
        labelKey="name"
        valueKey="url"
      />
      <TextField
        label="Tenant description"
        name="description"
      />
      <StringField
        label="Initial admin username"
        placeholder="generate automatically"
        name="username"
      />
      <SecretField
        label="Initial admin password"
        placeholder="generate automatically"
        name="password"
      />
    </FormContainer>
  </form>
);
