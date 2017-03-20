// @ngInject
function CostsPlansListController(
  baseControllerListClass,
  costPlansService,
  currentStateService,
  $uibModal) {
  const controllerScope = this;
  const ListController = baseControllerListClass.extend({
    init: function() {
      this.controllerScope = controllerScope;
      this.service = costPlansService;

      const fn = this._super.bind(this);

      this.loading = true;
      currentStateService.getCustomer().then(customer => {
        this.currentCustomer = customer;
      }).then(() => {
        this.tableOptions = this.getTableOptions();
        fn();
      }).finally(() => {
        this.loading = false;
      });
    },

    getTableOptions: function() {
      return {
        noDataText: gettext('You have no cost plans yet'),
        noMatchesText: gettext('No cost plans found matching filter.'),
        columns: [
          {
            title: gettext('Name'),
            render: row => row.name
          }
        ],
        tableActions: this.getTableActions(),
        rowActions: this.getRowActions(),
      };
    },

    getTableActions: function() {
      return [
        {
          title: gettext('Create plan'),
          iconClass: 'fa fa-plus',
          callback: this.openCreateDialog.bind(this),
        }
      ];
    },

    getRowActions: function() {
      return [
        {
          title: gettext('Details'),
          iconClass: 'fa fa-eye',
          callback: this.openDetailsDialog.bind(this),
        }
      ];
    },

    openDetailsDialog: function(plan) {
      $uibModal.open({
        component: 'costPlanDialog',
        resolve: {
          customer: () => this.currentCustomer,
          plan: () => plan,
        },
      }).result.then(function() {
        controllerScope.resetCache();
      });
    },

    openCreateDialog: function() {
      $uibModal.open({
        component: 'costPlanDialog',
        resolve: {
          customer: () => this.currentCustomer
        },
      }).result.then(function() {
        controllerScope.resetCache();
      });
    },

    getFilter: function() {
      return {
        customer: this.currentCustomer.uuid
      };
    }
  });
  controllerScope.__proto__ = new ListController();
}

const costPlansList = {
  controller: CostsPlansListController,
  controllerAs: 'ListController',
  templateUrl: 'views/partials/filtered-list.html',
};

export default costPlansList;
