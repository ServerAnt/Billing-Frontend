// @ngInject
export default function eventsService($q, baseServiceClass, ENV) {
  let ServiceClass = baseServiceClass.extend({
    init: function() {
      this._super();
      this.endpoint = '/events/';
    },
    setDefaultFilter: function() {
      this.defaultFilter = { exclude_extra: true };
    },
    getEventGroups: function() {
      let vm = this;
      if (this.eventGroups) {
        return $q.resolve(this.eventGroups);
      } else {
        let url = ENV.apiEndpoint + 'api/events/event_groups/';
        return this.$get(null, url).then(function(eventGroups) {
          delete eventGroups.$promise;
          delete eventGroups.$resolved;
          vm.eventGroups = eventGroups;
          return vm.eventGroups;
        });
      }
    },
  });
  return new ServiceClass();
}
