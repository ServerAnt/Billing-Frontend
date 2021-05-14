import { FunctionComponent } from 'react';
import { useBoolean } from 'react-use';

import { ChangePlanAction } from '@waldur/marketplace/resources/change-plan/ChangePlanAction';
import { MoveResourceAction } from '@waldur/marketplace/resources/list/MoveResourceAction';
import { SubmitReportAction } from '@waldur/marketplace/resources/report/SubmitReportAction';
import { SetBackendIdAction } from '@waldur/marketplace/resources/SetBackendIdAction';
import { TerminateAction } from '@waldur/marketplace/resources/terminate/TerminateAction';
import { Resource } from '@waldur/marketplace/resources/types';
import { ResourceActionComponent } from '@waldur/resource/actions/ResourceActionComponent';

import { EditAction } from './EditAction';

const ActionsList = [
  EditAction,
  MoveResourceAction,
  SubmitReportAction,
  ChangePlanAction,
  SetBackendIdAction,
  TerminateAction,
];

interface ResourceActionsButtonProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
}

export const ResourceActionsButton: FunctionComponent<ResourceActionsButtonProps> = (
  props,
) => {
  const [open, onToggle] = useBoolean(false);

  return (
    <ResourceActionComponent
      open={open}
      onToggle={onToggle}
      actions={ActionsList}
      resource={props.resource}
      reInitResource={props.reInitResource}
      refreshList={props.refreshList}
    />
  );
};
