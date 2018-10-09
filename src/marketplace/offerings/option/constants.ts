import { FieldType } from './types';

export const FIELD_TYPES: Array<{value: FieldType, label: string}> = [
  {
    value: 'boolean',
    label: 'Boolean',
  },
  {
    value: 'integer',
    label: 'Integer',
  },
  {
    value: 'money',
    label: 'Money',
  },
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'text',
    label: 'Text',
  },
  {
    value: 'html_text',
    label: 'HTML text',
  },
  {
    value: 'select_string',
    label: 'Select',
  },
  {
    value: 'select_openstack_tenant',
    label: 'Select OpenStack tenant',
  },
];