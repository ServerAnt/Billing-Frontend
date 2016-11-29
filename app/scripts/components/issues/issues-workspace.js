import template from './issues-workspace.html';

export default function issuesWorkspace() {
  return {
    restrict: 'E',
    controller: IssuesWorkspaceController,
    template: template,
  };
}

// @ngInject
function IssuesWorkspaceController($scope) {
  $scope.items = [
    {
      label: "Dashboard",
      icon: "fa-th-large",
      link: "support.dashboard"
    },
    {
      label: "Issues",
      icon: "fa-list",
      link: "support.list"
    },
    {
      label: "Activity stream",
      icon: "fa-rss",
      link: "support.activity"
    },
    {
      label: "SLAs",
      icon: "fa-headphones",
      link: "support.sla"
    }
  ];
}
