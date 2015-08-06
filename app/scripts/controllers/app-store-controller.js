(function() {
  angular.module('ncsaas')
    .controller('AppStoreController', [
      'baseControllerAddClass', 'servicesService', 'currentStateService', 'ENV', AppStoreController]);

  function AppStoreController(baseControllerAddClass, servicesService, currentStateService, ENV) {
    var controllerScope = this;
    var Controller = baseControllerAddClass.extend({
      UNIQUE_FIELDS: {
        service_project_link: 'service_project_link',
        ssh_public_key: 'ssh_public_key',
        configuration: 'configuration'
      },
      FIELD_TYPES: {
        string: 'string',
        field: 'field'
      },

      secondStep: false,
      thirdStep: false,
      resourceTypesBlock: false,
      showProjectAlertMessage: false,

      activeTab: null,
      successMessage: 'Purchase of {vm_name} was successful.',
      formOptions: {},
      allFormOptions: {},
      selectedService: {},
      selectedServiceName: null,
      selectedCategory: {},
      selectedResourceType: null,
      currentCustomer: {},

      configureStepNumber: 4,
      selectedPackageName: null,
      agreementShow: false,

      init:function() {
        this.service = servicesService;
        this.controllerScope = controllerScope;
        this.setSignalHandler('currentProjectUpdated', this.setCurrentProject.bind(controllerScope));
        this._super();
        this.listState = 'resources.list';
        this.categories = ENV.appStoreCategories;
      },
      activate:function() {
        var vm = this;
        servicesService.getServicesList().then(function(response) {
          vm.servicesList = response;
        });
        currentStateService.getCustomer().then(function(response) {
          vm.currentCustomer = response;
        })
      },
      setCategory: function(category) {
        this.selectedCategory = category;
        this.secondStep = true;
        this.selectedService = {};
        this.selectedServiceName = null;
        this.resourceTypesBlock = false;
        this.thirdStep = false;
      },
      setService:function(service) {
        this.selectedService = this.servicesList[service];
        this.selectedServiceName = service;
        this.resourceTypesBlock = true;
        this.thirdStep = false;
        this.formOptions = {};
        if (this.selectedService) {
          var types = Object.keys(this.selectedService.resources);
          if (types.length === 1) {
            this.setResourceType(types[0]);
            this.resourceTypesBlock = false;
            this.configureStepNumber = 3;
          } else {
            this.configureStepNumber = 4;
          }
        }
      },
      setResourceType: function(type) {
        var vm = this;
        vm.selectedResourceType = type;
        vm.thirdStep = true;
        vm.formOptions = {};
        if (vm.selectedService.resources[vm.selectedResourceType]) {
          vm.instance = servicesService.$create(vm.selectedService.resources[vm.selectedResourceType]);
          servicesService.getOption(vm.selectedService.resources[vm.selectedResourceType]).then(function(response) {
            vm.setFormOptions(response.actions.POST);
            vm.setCurrentProject();
          });
        }
      },
      setFormOptions: function(formOptions) {
        this.allFormOptions = formOptions;
        this.activeTab = null;
        for (var name in formOptions) {
          if (!formOptions[name].read_only && name != this.UNIQUE_FIELDS.service_project_link) {
            this.formOptions[formOptions[name].type] = this.formOptions[formOptions[name].type] || {};
            if (name == this.UNIQUE_FIELDS[name]) {
              this.formOptions[name] = formOptions[name];
            } else {
              if (!this.activeTab && formOptions[name].type == this.FIELD_TYPES.field) {
                this.activeTab = name;
              }
              this.formOptions[formOptions[name].type][name] = formOptions[name];
            }
          }
        }
      },
      doChoice: function(name, choice) {
        this.instance[name] = choice.value;
      },
      setCurrentProject: function() {
        var vm = this;
        currentStateService.getProject().then(function(response) {
          if (vm.isAvailableProject(response)) {
            vm.instance[vm.UNIQUE_FIELDS.service_project_link] = response.url;
          } else {
            vm.showProjectAlertMessage = true;
            vm.formOptions = {};
            vm.thirdStep = false;
          }
        });
      },
      isAvailableProject: function(currentProject) {
        if (this.allFormOptions[this.UNIQUE_FIELDS.service_project_link]) {
          var projectLinks = this.allFormOptions[this.UNIQUE_FIELDS.service_project_link].choices.map(function(choice) {
            return choice.value;
          });
          return projectLinks.indexOf(currentProject.url) + 1;
        }
        return false;
      },
      canSave: function() {
        for (var name in this.allFormOptions) {
          if (this.allFormOptions[name].required && !this.instance[name]) {
            return false;
          }
        }
        return true;
      },
      onError: function() {
        var message = '';
        for (var name in this.errors) {
          if (this.allFormOptions[name]) {
            message += this.allFormOptions[name].label + ': ' + this.errors[name] + '<br/>';
          } else {
            message += name+ ': ' + this.errors[name] + '<br/>';
          }
        }
        this.errorFlash(message);
      }
    });

    controllerScope.__proto__ = new Controller();
  }
})();
