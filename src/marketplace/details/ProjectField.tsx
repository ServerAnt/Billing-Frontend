import { FC } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import { InputField } from '@waldur/form/InputField';
import { translate } from '@waldur/i18n';
import { ProjectCreateButton } from '@waldur/project/ProjectCreateButton';
import { RootState } from '@waldur/store/reducers';
import { getWorkspace, getCustomer } from '@waldur/workspace/selectors';
import {
  ORGANIZATION_WORKSPACE,
  USER_WORKSPACE,
} from '@waldur/workspace/types';

import { FormGroup } from '../offerings/FormGroup';

import { ProjectSelectField } from './ProjectSelectField';

const mapStateToProps = (state: RootState) => {
  const workspace = getWorkspace(state);
  const customer = getCustomer(state);
  if (workspace === ORGANIZATION_WORKSPACE) {
    return {
      projects: customer.projects,
    };
  } else {
    return { workspace };
  }
};

const connector = connect(mapStateToProps);

type StateProps = ReturnType<typeof mapStateToProps>;

type OwnProps = { previewMode?: boolean };

const PureProjectField: FC<StateProps & OwnProps> = (props) =>
  props.projects ? (
    <FormGroup
      labelClassName="control-label col-sm-3"
      valueClassName="col-sm-9"
      label={translate('Project')}
      required={true}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {props.projects.length > 0 && (
          <div style={{ flexGrow: 1, marginRight: 10 }}>
            <ProjectSelectField projects={props.projects} />
          </div>
        )}
        {!props.previewMode && <ProjectCreateButton />}
      </div>
      <div className="help-block m-b-none text-muted">
        {translate('The project will be changed for all items in cart.')}
      </div>
    </FormGroup>
  ) : props.workspace === USER_WORKSPACE ? (
    <>
      <FormGroup
        labelClassName="control-label col-sm-3"
        valueClassName="col-sm-9"
        label={translate('Organization')}
        required={true}
      >
        <Field name="customer_create_request.name" component={InputField} />
      </FormGroup>
      <FormGroup
        labelClassName="control-label col-sm-3"
        valueClassName="col-sm-9"
        label={translate('Project')}
        required={true}
      >
        <Field name="project_create_request.name" component={InputField} />
      </FormGroup>
    </>
  ) : null;

export const ProjectField = connector(PureProjectField);
