import { FunctionComponent } from 'react';

import {
  TextField,
  SelectField,
  FormContainer,
  FieldError,
  SubmitButton,
} from '@waldur/form';
import { DateField } from '@waldur/form/DateField';
import { translate } from '@waldur/i18n';

import { ProjectNameField } from './ProjectNameField';

export const ProjectCreateForm: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.createProject)}
    className="form-horizontal"
  >
    <FormContainer
      submitting={props.submitting}
      labelClass="col-sm-3"
      controlClass="col-sm-5"
    >
      {ProjectNameField(props)}
      <TextField
        label={props.translate('Project description')}
        name="description"
      />
      {props.projectTypes.length >= 1 && (
        <SelectField
          label={props.translate('Project type')}
          name="type"
          options={props.projectTypes}
          getOptionValue={(option) => option.url}
          getOptionLabel={(option) => option.name}
          isClearable={true}
        />
      )}
      <DateField
        name="end_date"
        label={translate('End date')}
        description={translate(
          'The date is inclusive. Once reached, all project resource will be scheduled for termination.',
        )}
      />
    </FormContainer>
    <div className="form-group">
      <div className="col-sm-offset-3 col-sm-5">
        <FieldError error={props.error} />
        <SubmitButton
          disabled={props.invalid}
          submitting={props.submitting}
          label={props.translate('Add project')}
        />
        <button
          type="button"
          className="btn btn-default m-l-sm"
          onClick={props.gotoProjectList}
        >
          {props.translate('Cancel')}
        </button>
      </div>
    </div>
  </form>
);
