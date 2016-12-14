'use strict';

describe('Timetables E2E Tests:', function () {
  describe('Test Timetables page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/timetables');
      expect(element.all(by.repeater('timetable in timetables')).count()).toEqual(0);
    });
  });
});
