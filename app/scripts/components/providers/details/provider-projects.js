import template from './provider-projects.html';

export default function providerProjects() {
  return {
    restrict: 'E',
    scope: {
      service: '=provider'
    },
    controller: ProviderProjectsController,
    template: template
  };
}

// @ngInject
function ProviderProjectsController(
  $q,
  $scope,
  joinServiceProjectLinkService,
  projectsService,
  currentStateService,
  customersService) {
  angular.extend($scope, {
    init: function() {
      $scope.loading = true;
      $scope.getChoices().then(function(choices) {
        $scope.choices = choices;
      }).finally(function() {
        $scope.loading = false;
      });
    },
    getChoices: function() {
      var vm = this;
      return customersService.isOwnerOrStaff().then(function(canManage) {
        vm.canManage = canManage;
        if (!vm.canManage) {
          return;
        }
        return vm.getContext().then(function(context) {
          var link_for_project = {};
          angular.forEach(context.links, function(link) {
            link_for_project[link.project_uuid] = link;
          });
          return context.projects.map(function(project) {
            var link = link_for_project[project.uuid];
            return vm.newChoice(project, link);
          });
        });
      });

    },
    newChoice: function(project, link) {
      return {
        title: project.name,
        selected: link && !!link.url,
        link_url: link && link.url,
        project_url: project.url,
        subtitle: link && link.state
      };
    },
    getContext: function() {
      // Context consists of list of projects and list of links
      var context = {};
      return $q.all([
        projectsService.getList().then(function(projects) {
          context.projects = projects;
        }),
        this.getLinks().then(function(links) {
          context.links = links;
        })
      ]).then(function() {
        return context;
      });
    },
    getLinks: function() {
      // Get service project links filtered by customer and service
      return currentStateService.getCustomer().then(function(customer) {
        return joinServiceProjectLinkService.getServiceProjectLinks(
          customer.uuid, $scope.service.service_type, $scope.service.uuid
        );
      });
    },
    save: function() {
      var add_promises = this.choices.filter(function(choice) {
        return choice.selected && !choice.link_url;
      }).map(function(choice) {
        choice.subtitle = 'Adding link';
        return joinServiceProjectLinkService.addLink(
          $scope.service.service_type,
          $scope.service.uuid,
          choice.project_url).then(function(link) {
            choice.link_url = link.url;
            choice.subtitle = 'Link created';
          }).catch(function(response) {
            var reason = '';
            if (response.data && response.data.detail) {
              reason = response.data.detail;
            }
            choice.subtitle = 'Unable to create link. ' + reason;
            choice.selected = false;
          });
      });

      var delete_promises = this.choices.filter(function(choice) {
        return !choice.selected && choice.link_url;
      }).map(function(choice) {
        choice.subtitle = 'Removing link';
        return joinServiceProjectLinkService.$deleteByUrl(choice.link_url).then(function() {
          choice.link_url = null;
          choice.subtitle = 'Link removed';
        }).catch(function(response) {
          var reason = '';
          if (response.data && response.data.detail) {
            reason = response.data.detail;
          }
          choice.subtitle = 'Unable to delete link. ' + reason;
          choice.selected = true;
        });
      });

      return $q.all(add_promises.concat(delete_promises));
    }
  });
  $scope.init();
}
