'use strict';

(function() {

  angular.module('ncsaas').directive('responsiveTable', responsiveTable);

  responsiveTable.$inject = ['$timeout'];

  function responsiveTable($timeout) {
    return {
      restrict: 'E',
      scope: {
        controller: '=tableCtrl'
      },
      template: '<table class="table table-striped table-bordered table-hover"/>',
      link: function(scope, element) {
        var options = scope.controller.tableOptions;

        $timeout(function() {
          var table = initTable();
          connectRowButtons(table);
          connectWatcher(table);
        });

        function initTable() {
          var exportButtons = getExportButtons(
            options.columns.length,
            options.rowActions,
            ['copyHtml5', 'csvHtml5', 'excelHtml5', 'pdfHtml5', 'print']
          );
          var exportCollection = {
            extend: 'collection',
            text: '<i class="fa fa-cloud-download"></i> Export',
            autoClose: true,
            fade: 0,
            buttons: exportButtons
          };
          var buttons = [exportCollection];
          if (options.tableActions) {
            var tableButtons = getTableButtons(options.tableActions);
            buttons = buttons.concat(tableButtons);
          }
          buttons.push({
            text: '<i class="fa fa-refresh"></i> Refresh',
            action: function() {
              $timeout(function() {
                scope.controller.resetCache();
              });
            }
          });

          var columns = options.columns;
          if (options.rowActions) {
            var actionColumn = getActionColumn(options.rowActions, options.actionsColumnWidth);
            columns.push(actionColumn);
          }

          var table = $(element.find('table')[0]).DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            ordering: false,
            ajax: serverDataTableCallback,
            dom: '<"html5buttons"B>lTfgitp',
            buttons: buttons,
            columns: columns,
            language: {
              emptyTable: options.noDataText,
              zeroRecords: options.noMatchesText
            }
          });
          return table;
        }

        function connectWatcher(table) {
          scope.$watchCollection('controller.list', function() {
            table.draw();
          });
        }

        function getTableButtons(actions) {
          return actions.map(function(action) {
            return {
              text: action.name,
              action: function() {
                $timeout(function() {
                  action.callback();
                });
              },
              className: action.disabled && 'disabled' || ''
            };
          });
        }

        function connectRowButtons(table) {
          table.on('click', 'button', function(event) {
            $(this).blur();
            var rowIndex = parseInt($(event.target).attr('row-index'));
            var actionIndex = parseInt($(event.target).attr('action-index'));
            var action = options.rowActions[actionIndex];
            var row = scope.controller.list[rowIndex];
            $timeout(function() {
              action.callback.apply(scope, [row]);
            });
          });
        }

        function getActionColumn(spec, width) {
          return {
            title: 'Actions',
            orderable: false,
            render: function(data, type, row, meta) {
              return spec.map(function(action, index) {
                return '<button class="btn btn-default btn-sm" row-index="' + meta.row + '" action-index="' + index + '">' + action.name + '</button>';
              }).join('');
            },
            width: width
          };
        }

        function getExportButtons(columnsCount, rowActions, formats) {
          var title = document.title + ' - ' + moment().format('YYYY-MM-DD');
          var exportOptions = {};
          if (rowActions) {
            exportOptions.columns = range(columnsCount);
          }
          return formats.map(function(format) {
            return {
              extend: format,
              exportOptions: exportOptions,
              title: title
            };
          });
        }

        function range(n) {
          var x = [];
          for (var i = 0; i < n; i++) {
            x.push(i);
          }
          return x;
        }

        function serverDataTableCallback(request, drawCallback, settings) {
          scope.controller.requestLoad(request).then(function(list) {
            var total = scope.controller.getTotal();
            drawCallback({
              draw: request.draw,
              recordsTotal: total,
              recordsFiltered: total,
              data: scope.controller.list
            });
          });
        }
      }
    };
  }
})();
