import { FunctionComponent } from 'react';
import { FormGroup } from 'react-bootstrap';
import { Field } from 'redux-form';

import { ENV } from '@waldur/configs/default';
import { Tooltip } from '@waldur/core/Tooltip';
import { translate } from '@waldur/i18n';

export const OwnerGroup: FunctionComponent<{
  disabled;
  canChangeRole;
  canManageOwner;
}> = ({ disabled, canChangeRole, canManageOwner }) => (
  <FormGroup>
    <div className="checkbox">
      <label>
        <Field
          name="is_owner"
          component="input"
          type="checkbox"
          disabled={disabled || !canChangeRole || !canManageOwner}
        />
        {translate(ENV.roles.owner)}{' '}
        {(!canChangeRole || !canManageOwner) && (
          <Tooltip
            id="form-field-tooltip"
            label={
              !canChangeRole
                ? translate('You cannot change your own role.')
                : !canManageOwner
                ? translate('You cannot manage other organization owner.')
                : ''
            }
          >
            <i className="fa fa-question-circle" />
          </Tooltip>
        )}
      </label>
    </div>
  </FormGroup>
);
