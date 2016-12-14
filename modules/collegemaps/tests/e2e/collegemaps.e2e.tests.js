'use strict';

describe('Collegemaps E2E Tests:', function () {
  describe('Test Collegemaps page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/collegemaps');
      expect(element.all(by.repeater('collegemap in collegemaps')).count()).toEqual(0);
    });
  });
});
