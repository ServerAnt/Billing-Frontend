import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@waldur/i18n';
import { connectAngularComponent } from '@waldur/store/connect';
import { getCustomer, isOwnerOrStaff } from '@waldur/workspace/selectors';

import * as actions from './actions';
import { ProjectDetails } from './ProjectDetails';
import { ProjectUpdateForm } from './ProjectUpdateForm';

const ProjectUpdateComponent = props =>
  props.canManage ? (
    <ProjectUpdateForm {...props}/>
  ) : (
    <ProjectDetails
      name={props.project.name}
      description={props.project.description}
      translate={props.translate}
    />
  );

const mapStateToProps = (state, ownProps) => ({
  customer: getCustomer(state),
  project_uuid: ownProps.project.uuid,
  initialValues: {
    name: ownProps.project.name,
    description: ownProps.project.description,
  },
  canManage: isOwnerOrStaff(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateProject: data => actions.updateProject({
    ...data,
    uuid: ownProps.project.uuid,
    cache: ownProps.project,
  }, dispatch),
});

const enhance = compose(
  withTranslation,
  connect(mapStateToProps, mapDispatchToProps),
);

export const ProjectUpdateContainer = enhance(ProjectUpdateComponent);

export default connectAngularComponent(ProjectUpdateContainer, ['project']);
