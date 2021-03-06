import Axios from 'axios';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { useAsync } from 'react-use';

import { ENV } from '@waldur/configs/default';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { Tooltip } from '@waldur/core/Tooltip';
import { translate } from '@waldur/i18n';
import { openModalDialog } from '@waldur/modal/actions';

const BackendHealthStatusDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BackendHealthStatusDialog" */ './BackendHealthStatusDialog'
    ),
  'BackendHealthStatusDialog',
);

export const getBackendHealthStatus = () =>
  Axios.get(`${ENV.apiEndpoint}health-check/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

const isWorking = (data): boolean => {
  for (const item of Object.values(data)) {
    if (item !== 'working') {
      return false;
    }
  }
  return true;
};

const openBackendHealthStatusDialog = () =>
  openModalDialog(BackendHealthStatusDialog);

export const PureBackendHealthStatusIndicator: FunctionComponent<any> = (
  props,
) => {
  const { value, error } = useAsync(getBackendHealthStatus, []);
  return (
    <span className="m-r-sm">
      {value &&
      value.headers &&
      value.headers['content-type'] === 'application/json' ? (
        <a onClick={() => props.openDialog()}>
          {isWorking(value.data) ? (
            <i className="fa fa-check-circle text-success" />
          ) : (
            <i className="fa fa-times-circle text-danger" />
          )}
        </a>
      ) : error ? (
        <Tooltip
          label={translate('Unable to load backend health status')}
          id="backend-status-tooltip"
        >
          <i className="fa fa-info-circle text-danger" />
        </Tooltip>
      ) : null}
    </span>
  );
};

const mapDispatchToProps = (dispatch) => ({
  openDialog: () => dispatch(openBackendHealthStatusDialog()),
});

const enhance = connect(null, mapDispatchToProps);

export const BackendHealthStatusIndicator = enhance(
  PureBackendHealthStatusIndicator,
);
