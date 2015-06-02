(function() {
	'use strict';

	var MS_PER_DAY = 1000 * 60 * 60 * 24;

	describe('getPriority', function() {
		it('should work when only studied at the start of this morning', function() {
			var studyDates = [
				h.startOfDay() // start of morning
			];
			expect(app.getPriority(studyDates)).toBe(-1); // -1 days overdue = due tomorrow
		});

		it('should work when studied early morning, yesterday and today', function() {
			var studyDates = [
				h.addDays(h.startOfDay(), -1), // start of yesterday morning
				h.startOfDay() // start of morning
			];
			expect(app.getPriority(studyDates)).toBe(-2); // -2 days overdue = due in 2 days
		});
	});
})();