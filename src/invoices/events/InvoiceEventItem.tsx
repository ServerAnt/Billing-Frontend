import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { formatRelative, formatDateTime } from '@waldur/core/dateUtils';
import { lazyComponent } from '@waldur/core/lazyComponent';
import { translate } from '@waldur/i18n';
import { closeModalDialog, openModalDialog } from '@waldur/modal/actions';

import { InvoiceEvent } from './types';

const EventDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "EventDetailsDialog" */ '@waldur/events/EventDetailsDialog'
    ),
  'EventDetailsDialog',
);

interface InvoiceEventItemProps {
  event: InvoiceEvent;
}

export const InvoiceEventItem: FunctionComponent<InvoiceEventItemProps> = ({
  event,
}) => {
  const dispatch = useDispatch();

  const showEventDetails = (event: InvoiceEvent) => {
    dispatch(closeModalDialog());
    dispatch(
      openModalDialog(EventDetailsDialog, {
        resolve: {
          event: event.original,
        },
      }),
    );
  };

  return (
    <div className="vertical-timeline-block">
      <div className={classNames('vertical-timeline-icon', event.color)}>
        <i className={classNames('fa', event.icon)} />
      </div>

      <div className="vertical-timeline-content">
        {event.message}
        <Button
          bsSize="sm"
          bsStyle="primary"
          onClick={() => showEventDetails(event)}
        >
          <i className="fa fa-eye"></i>
          {translate('More info')}
        </Button>
        <span className="vertical-date">
          {translate('{relative} ago', {
            relative: formatRelative(event.date),
          })}
          <br />
          <small>{formatDateTime(event.date)}</small>
        </span>
      </div>
    </div>
  );
};
