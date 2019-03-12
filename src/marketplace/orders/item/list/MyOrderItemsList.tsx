import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDateTime } from '@waldur/core/dateUtils';
import { defaultCurrency } from '@waldur/core/services';
import { translate } from '@waldur/i18n';
import { ResourceShowUsageButton } from '@waldur/marketplace/resources/usage/ResourceShowUsageButton';
import { connectTable, createFetcher, Table } from '@waldur/table-react';
import { renderFieldOrDash } from '@waldur/table-react/utils';
import { getCustomer } from '@waldur/workspace/selectors';

import { RowNameField } from './RowNameField';

const TableComponent = props => {
  const columns = [
    {
      title: translate('Offering'),
      render: RowNameField,
    },
    {
      title: translate('Project'),
      render: ({ row }) => row.project_name,
    },
    {
      title: translate('Created at'),
      render: ({ row }) => formatDateTime(row.created),
    },
    {
      title: translate('Type'),
      render: ({ row }) => row.type,
    },
    {
      title: translate('State'),
      render: ({ row }) => row.state,
    },
    {
      title: translate('Plan'),
      render: ({ row }) => renderFieldOrDash(row.plan_name),
    },
    {
      title: translate('Cost'),
      render: ({ row }) => defaultCurrency(row.cost),
    },
    {
      title: translate('Actions'),
      render: ({ row }) => (
        row.marketplace_resource_uuid ?
        <ResourceShowUsageButton resource={row.marketplace_resource_uuid}/> :
        null
      ),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('Order items')}
      enableExport={true}
    />
  );
};

const mapPropsToFilter = props => {
  const filter: Record<string, string> = {o: '-created'};
  if (props.customer) {
    filter.customer_uuid = props.customer.uuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.value;
    }
    if (props.filter.project) {
      filter.project_uuid = props.filter.project.uuid;
    }
  }
  return filter;
};

const exportRow = row => [
  row.offering_name,
  row.project_name,
  formatDateTime(row.created),
  row.type,
  row.state,
  renderFieldOrDash(row.plan_name),
  defaultCurrency(row.cost || 0),
];

const exportFields = [
  'Offering',
  'Project',
  'Created at',
  'Type',
  'State',
  'Plan',
  'Cost',
];

const TableOptions = {
  table: 'MyOrderItemList',
  fetchData: createFetcher('marketplace-order-items'),
  mapPropsToFilter,
  exportRow,
  exportFields,
};

const mapStateToProps = state => ({
  filter: getFormValues('MyOrderItemsFilter')(state),
  customer: getCustomer(state),
});

const enhance = compose(
  connect(mapStateToProps),
  connectTable(TableOptions),
);

export const MyOrderItemsList = enhance(TableComponent);