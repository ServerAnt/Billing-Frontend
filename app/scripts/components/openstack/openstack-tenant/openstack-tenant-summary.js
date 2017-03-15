import template from './openstack-tenant-summary.html';
import { getTenantTemplate } from '../utils';

const openstackTenantSummary = {
  template,
  bindings: {
    resource: '<'
  },
  controller: class OpenstackTenantSummaryController {
    constructor($scope) {
      // @ngInject
      $scope.$watch(() => this.resource, () => {
        this.template = getTenantTemplate(this.resource);
      });
    }
  }
};

export default openstackTenantSummary;
