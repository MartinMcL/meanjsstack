(function () {
  'use strict';

  describe('Collegemaps Route Tests', function () {
    // Initialize global variables
    var $scope,
      CollegemapsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CollegemapsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CollegemapsService = _CollegemapsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('collegemaps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/collegemaps');
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
          CollegemapsController,
          mockCollegemap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('collegemaps.view');
          $templateCache.put('modules/collegemaps/client/views/view-collegemap.client.view.html', '');

          // create mock Collegemap
          mockCollegemap = new CollegemapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Collegemap Name'
          });

          // Initialize Controller
          CollegemapsController = $controller('CollegemapsController as vm', {
            $scope: $scope,
            collegemapResolve: mockCollegemap
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:collegemapId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.collegemapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            collegemapId: 1
          })).toEqual('/collegemaps/1');
        }));

        it('should attach an Collegemap to the controller scope', function () {
          expect($scope.vm.collegemap._id).toBe(mockCollegemap._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/collegemaps/client/views/view-collegemap.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CollegemapsController,
          mockCollegemap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('collegemaps.create');
          $templateCache.put('modules/collegemaps/client/views/form-collegemap.client.view.html', '');

          // create mock Collegemap
          mockCollegemap = new CollegemapsService();

          // Initialize Controller
          CollegemapsController = $controller('CollegemapsController as vm', {
            $scope: $scope,
            collegemapResolve: mockCollegemap
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.collegemapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/collegemaps/create');
        }));

        it('should attach an Collegemap to the controller scope', function () {
          expect($scope.vm.collegemap._id).toBe(mockCollegemap._id);
          expect($scope.vm.collegemap._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/collegemaps/client/views/form-collegemap.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CollegemapsController,
          mockCollegemap;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('collegemaps.edit');
          $templateCache.put('modules/collegemaps/client/views/form-collegemap.client.view.html', '');

          // create mock Collegemap
          mockCollegemap = new CollegemapsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Collegemap Name'
          });

          // Initialize Controller
          CollegemapsController = $controller('CollegemapsController as vm', {
            $scope: $scope,
            collegemapResolve: mockCollegemap
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:collegemapId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.collegemapResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            collegemapId: 1
          })).toEqual('/collegemaps/1/edit');
        }));

        it('should attach an Collegemap to the controller scope', function () {
          expect($scope.vm.collegemap._id).toBe(mockCollegemap._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/collegemaps/client/views/form-collegemap.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
