(function () {
  'use strict';

  describe('Timetables Route Tests', function () {
    // Initialize global variables
    var $scope,
      TimetablesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TimetablesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TimetablesService = _TimetablesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('timetables');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/timetables');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TimetablesController,
          mockTimetable;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('timetables.view');
          $templateCache.put('modules/timetables/client/views/view-timetable.client.view.html', '');

          // create mock Timetable
          mockTimetable = new TimetablesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Timetable Name'
          });

          // Initialize Controller
          TimetablesController = $controller('TimetablesController as vm', {
            $scope: $scope,
            timetableResolve: mockTimetable
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:timetableId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.timetableResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            timetableId: 1
          })).toEqual('/timetables/1');
        }));

        it('should attach an Timetable to the controller scope', function () {
          expect($scope.vm.timetable._id).toBe(mockTimetable._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/timetables/client/views/view-timetable.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TimetablesController,
          mockTimetable;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('timetables.create');
          $templateCache.put('modules/timetables/client/views/form-timetable.client.view.html', '');

          // create mock Timetable
          mockTimetable = new TimetablesService();

          // Initialize Controller
          TimetablesController = $controller('TimetablesController as vm', {
            $scope: $scope,
            timetableResolve: mockTimetable
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.timetableResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/timetables/create');
        }));

        it('should attach an Timetable to the controller scope', function () {
          expect($scope.vm.timetable._id).toBe(mockTimetable._id);
          expect($scope.vm.timetable._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/timetables/client/views/form-timetable.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TimetablesController,
          mockTimetable;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('timetables.edit');
          $templateCache.put('modules/timetables/client/views/form-timetable.client.view.html', '');

          // create mock Timetable
          mockTimetable = new TimetablesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Timetable Name'
          });

          // Initialize Controller
          TimetablesController = $controller('TimetablesController as vm', {
            $scope: $scope,
            timetableResolve: mockTimetable
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:timetableId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.timetableResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            timetableId: 1
          })).toEqual('/timetables/1/edit');
        }));

        it('should attach an Timetable to the controller scope', function () {
          expect($scope.vm.timetable._id).toBe(mockTimetable._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/timetables/client/views/form-timetable.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
