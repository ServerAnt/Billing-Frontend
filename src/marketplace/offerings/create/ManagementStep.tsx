import React, { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { FieldArray, FormSection } from 'redux-form';

import { required } from '@waldur/core/validators';
import { FormContainer, SelectField, StringField } from '@waldur/form';
import { StaticField } from '@waldur/form/StaticField';
import { translate, TranslateProps } from '@waldur/i18n';
import { Option } from '@waldur/marketplace/common/registry';
import { ProviderFormProps } from '@waldur/providers/types';

import { OfferingOptions } from '../option/OfferingOptions';
import { OfferingScheduler } from '../option/OfferingScheduler';

export interface ManagementStepProps extends TranslateProps {
  pluginOptionsForm?: React.ComponentType<any>;
  secretOptionsForm?: React.ComponentType<any>;
  showOptions: boolean;
  schedulable?: boolean;
  serviceSettingsForm?: React.ComponentType<ProviderFormProps>;
  offeringTypes: Option[];
  editable: boolean;
  typeLabel?: string;
  showBackendId?: boolean;
  allowToUpdateService?: boolean;
  openServiceSettingsDetails(): void;
}

const ContainerProps = {
  submitting: false,
  labelClass: 'col-sm-2',
  controlClass: 'col-sm-8',
  clearOnUnmount: false,
};

export const ManagementStep: FunctionComponent<ManagementStepProps> = (
  props,
) => (
  <>
    <FormContainer {...ContainerProps}>
      {props.editable ? (
        <SelectField
          name="type"
          label={props.translate('Type')}
          required={true}
          options={props.offeringTypes}
          isClearable={false}
          validate={required}
        />
      ) : (
        <StaticField
          label={props.translate('Type')}
          value={props.typeLabel}
          {...ContainerProps}
        />
      )}
    </FormContainer>
    {props.editable && props.serviceSettingsForm ? (
      <FormSection name="service_settings">
        {React.createElement(props.serviceSettingsForm, {
          translate: props.translate,
          container: ContainerProps,
        })}
      </FormSection>
    ) : !props.showOptions && props.typeLabel && props.allowToUpdateService ? (
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <Button onClick={props.openServiceSettingsDetails}>
            {translate('Update service settings')}
          </Button>
        </div>
      </div>
    ) : null}
    {props.schedulable && (
      <FieldArray name="schedules" component={OfferingScheduler} />
    )}
    {props.showOptions && (
      <FieldArray name="options" component={OfferingOptions} />
    )}
    {props.secretOptionsForm && (
      <FormSection name="secret_options">
        {React.createElement(props.secretOptionsForm, {
          container: ContainerProps,
        })}
      </FormSection>
    )}
    {props.showBackendId && (
      <FormContainer {...ContainerProps}>
        <StringField name="backend_id" label={translate('Backend ID')} />
      </FormContainer>
    )}
    {props.pluginOptionsForm && (
      <FormSection name="plugin_options">
        {React.createElement(props.pluginOptionsForm, {
          container: ContainerProps,
        })}
      </FormSection>
    )}
  </>
);
