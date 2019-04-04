import * as React from 'react';

import { formatDate } from '@waldur/core/dateUtils';
import { OrganizationLink } from '@waldur/customer/OrganizationLink';
import { Customer } from '@waldur/customer/types';
import { translate } from '@waldur/i18n';
import { Table, connectTable, createFetcher } from '@waldur/table-react';
import { TableProps } from '@waldur/table-react/Table';
import { Column } from '@waldur/table-react/types';
import { renderFieldOrDash } from '@waldur/table-react/utils';

const AbbreviationField = ({ row }) => <span>{renderFieldOrDash(row.abbreviation)}</span>;

const CreatedDateField = ({ row }) => <span>{renderFieldOrDash(formatDate(row.created))}</span>;

const TableComponent = (props: TableProps<Customer> & {provider_uuid: string}) => {
  const columns: Array<Column<Customer>> = [
    {
      title: translate('Organization'),
      render: OrganizationLink,
    },
    {
      title: translate('Abbreviation'),
      render: AbbreviationField,
    },
    {
      title: translate('Created'),
      render: CreatedDateField,
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('organizations')}
      showPageSizeSelector={true}
      enableExport={true}
    />
  );
};

const exportRow = (row: Customer) => [
  row.name,
  row.abbreviation,
  formatDate(row.created),
];

const exportFields = () => ([
  translate('Organization'),
  translate('Abbreviation'),
  translate('Created'),
]);

const mapPropsToFilter = props => ({
  service_settings_uuid: props.provider_uuid,
});

const TableOptions = {
  table: 'SharedProviderCustomers',
  fetchData: createFetcher('openstack-shared-settings-customers'),
  exportRow,
  exportFields,
  mapPropsToFilter,
};

export const SharedProviderCustomers = connectTable(TableOptions)(TableComponent) as
  React.ComponentType<{provider_uuid: string}>;