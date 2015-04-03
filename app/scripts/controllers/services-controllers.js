'use strict';

(function() {
  angular.module('ncsaas')
    .controller('ServiceListController', ['servicesService', ServiceListController]);

  function ServiceListController(servicesService) {
    var vm = this;

    servicesService.getList().then(function(response) {
      vm.list = response;
    });
    vm.remove = remove;

    function remove(service) {
      var index = vm.list.indexOf(service);

      service.$delete(function() {
        vm.list.splice(index, 1);
      });
    }



  }

})();

(function() {
  angular.module('ncsaas')
    .controller('ServiceAddController',
      ['servicesService', '$state', 'currentStateService', '$rootScope', ServiceAddController]);

  function ServiceAddController(servicesService, $state, currentStateService, $rootScope) {
    var vm = this;
    vm.service = servicesService.$create();
    vm.save = save;
    vm.cancel = cancel;
    vm.projectList = {};
    vm.custumersList = {};

    function activate() {
      currentStateService.getCustomer().then(function(customer) {
        vm.service.customer = customer.url;
      });
      if (vm.service.auth_url || vm.service.name) {
        if (confirm('All fields will be cleaned!')) {
          vm.service.auth_url = '';
          vm.service.name = '';
        }
      }
    }

    $rootScope.$on('currentCustomerUpdated', activate);

    function save() {
      vm.service.$save(success, error);

      function success() {
        $state.go('services.list');
      }

      function error(response) {
        vm.errors = response.data;
      }
    }

    function cancel() {
      $state.go('services.list');
    }

    activate();

  }

})();
