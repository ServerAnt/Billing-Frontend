import { useCallback } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { SubmitButton } from '@waldur/auth/SubmitButton';
import { FormContainer } from '@waldur/form';
import { AsyncSelectField } from '@waldur/form/AsyncSelectField';
import { DateField } from '@waldur/form/DateField';
import {
  datePickerOverlayContainerInDialogs,
  reactSelectMenuPortaling,
} from '@waldur/form/utils';
import { translate } from '@waldur/i18n';
import { offeringsAutocomplete } from '@waldur/marketplace/common/autocompletes';
import { closeModalDialog } from '@waldur/modal/actions';
import { CloseDialogButton } from '@waldur/modal/CloseDialogButton';
import { showErrorResponse } from '@waldur/store/notify';
import { fetchListStart } from '@waldur/table/actions';
import { getCustomer } from '@waldur/workspace/selectors';

import { grantPermission, usersAutocomplete } from './api';
import { OFFERING_PERMISSIONS_LIST_ID } from './constants';

export const OfferingPermissionCreateDialog = reduxForm({
  form: 'OfferingPermissionCreateDialog',
})(({ submitting, handleSubmit }) => {
  const dispatch = useDispatch();
  const customer = useSelector(getCustomer);
  const saveUser = useCallback(
    async (formData) => {
      try {
        await grantPermission({
          offering: formData.offering.url,
          user: formData.user.url,
          expiration_time: formData.expiration_time,
        });
        dispatch(closeModalDialog());
        dispatch(
          fetchListStart(OFFERING_PERMISSIONS_LIST_ID, {
            customer_uuid: customer.uuid,
          }),
        );
      } catch (error) {
        dispatch(
          showErrorResponse(error, translate('Unable to grant permission.')),
        );
      }
    },
    [dispatch, customer],
  );
  return (
    <form onSubmit={handleSubmit(saveUser)}>
      <ModalHeader>
        <ModalTitle>{translate('Grant permission')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormContainer submitting={submitting}>
          <AsyncSelectField
            name="user"
            label={translate('User')}
            placeholder={translate('Select user...')}
            loadOptions={(query, prevOptions, page) =>
              usersAutocomplete({ full_name: query }, prevOptions, page)
            }
            {...reactSelectMenuPortaling()}
            getOptionLabel={({ full_name }) => full_name}
            required={true}
          />
          <AsyncSelectField
            name="offering"
            label={translate('Offering')}
            placeholder={translate('Select offerings...')}
            loadOptions={(query, prevOptions, page) =>
              offeringsAutocomplete(
                { name: query, shared: true, customer: customer.url },
                prevOptions,
                page,
              )
            }
            {...reactSelectMenuPortaling()}
            getOptionLabel={({ name }) => name}
            required={true}
          />
          <Field
            name="expiration_time"
            label={translate('Expiration time')}
            component={DateField}
            {...datePickerOverlayContainerInDialogs()}
          />
        </FormContainer>
      </ModalBody>
      <ModalFooter>
        <SubmitButton block={false} submitting={submitting}>
          {translate('Submit')}
        </SubmitButton>
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
});
