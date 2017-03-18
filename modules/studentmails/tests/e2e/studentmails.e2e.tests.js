'use strict';

describe('Studentmails E2E Tests:', function () {
  describe('Test Studentmails page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/studentmails');
      expect(element.all(by.repeater('studentmail in studentmails')).count()).toEqual(0);
    });
  });
});
