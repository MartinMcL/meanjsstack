(function () {
  'use strict';

  describe('Studentmails Route Tests', function () {
    // Initialize global variables
    var $scope,
      StudentmailsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _StudentmailsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      StudentmailsService = _StudentmailsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('studentmails');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/studentmails');
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
          StudentmailsController,
          mockStudentmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('studentmails.view');
          $templateCache.put('modules/studentmails/client/views/view-studentmail.client.view.html', '');

          // create mock Studentmail
          mockStudentmail = new StudentmailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Studentmail Name'
          });

          // Initialize Controller
          StudentmailsController = $controller('StudentmailsController as vm', {
            $scope: $scope,
            studentmailResolve: mockStudentmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:studentmailId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.studentmailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            studentmailId: 1
          })).toEqual('/studentmails/1');
        }));

        it('should attach an Studentmail to the controller scope', function () {
          expect($scope.vm.studentmail._id).toBe(mockStudentmail._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/studentmails/client/views/view-studentmail.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          StudentmailsController,
          mockStudentmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('studentmails.create');
          $templateCache.put('modules/studentmails/client/views/form-studentmail.client.view.html', '');

          // create mock Studentmail
          mockStudentmail = new StudentmailsService();

          // Initialize Controller
          StudentmailsController = $controller('StudentmailsController as vm', {
            $scope: $scope,
            studentmailResolve: mockStudentmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.studentmailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/studentmails/create');
        }));

        it('should attach an Studentmail to the controller scope', function () {
          expect($scope.vm.studentmail._id).toBe(mockStudentmail._id);
          expect($scope.vm.studentmail._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/studentmails/client/views/form-studentmail.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          StudentmailsController,
          mockStudentmail;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('studentmails.edit');
          $templateCache.put('modules/studentmails/client/views/form-studentmail.client.view.html', '');

          // create mock Studentmail
          mockStudentmail = new StudentmailsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Studentmail Name'
          });

          // Initialize Controller
          StudentmailsController = $controller('StudentmailsController as vm', {
            $scope: $scope,
            studentmailResolve: mockStudentmail
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:studentmailId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.studentmailResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            studentmailId: 1
          })).toEqual('/studentmails/1/edit');
        }));

        it('should attach an Studentmail to the controller scope', function () {
          expect($scope.vm.studentmail._id).toBe(mockStudentmail._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/studentmails/client/views/form-studentmail.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
