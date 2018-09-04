import * as React from 'react';
import { FieldArray } from 'redux-form';

import {
  SelectAsyncField,
  FormContainer,
  SelectField,
} from '@waldur/form-react';

import { OfferingAttributes } from './OfferingAttributes';
import { OfferingPlans } from './OfferingPlans';

export const OfferingConfigureStep = props => (
  <>
    <FormContainer
      submitting={props.submitting}
      labelClass="col-sm-3"
      controlClass="col-sm-9"
      clearOnUnmount={false}>
      <SelectField
        name="type"
        label={props.translate('Type')}
        required={true}
        options={props.offeringTypes}
      />
      <SelectAsyncField
        name="category"
        label={props.translate('Category')}
        loadOptions={props.loadCategories}
        required={true}
        labelKey="title"
        valueKey="url"
      />
    </FormContainer>
    {props.category && <OfferingAttributes {...props}/>}
    <FieldArray name="plans" component={OfferingPlans} />
  </>
);
