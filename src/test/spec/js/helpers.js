(function() {
	'use strict';

	describe('daysAgo', function() {
		it('h.daysAgo(2) === "2 days ago"', function() {
			expect(h.daysAgo(2)).toBe('2 days ago');
		});

		it('h.daysAgo(2, "overdue") === "2 days overdue"', function() {
			expect(h.daysAgo(2, 'overdue')).toBe('2 days overdue');
		});

		it('h.daysAgo(1) === "yesterday"', function() {
			expect(h.daysAgo(1)).toBe('yesterday');
		});

		it('h.daysAgo(0) === "today"', function() {
			expect(h.daysAgo(0)).toBe('today');
		});

		it('h.daysAgo(-1) === "tomorrow"', function() {
			expect(h.daysAgo(-1)).toBe('tomorrow');
		});

		it('h.daysAgo(-2) === "in 2 days"', function() {
			expect(h.daysAgo(-2)).toBe('in 2 days');
		});
	});

	describe('startOfDay', function() {
		function isInteger(value) {
			return typeof value === "number" &&
				isFinite(value) &&
				Math.floor(value) === value;
		}

		describe('startOfDay()', function() {
			var sod = h.startOfDay();
			var sodDate = new Date(sod);
			var nowDate = new Date();

			it('should return a timestamp', function() {
				expect(isInteger(sod)).toBe(true);
			});

			it('should have the same date as today', function() {
				expect(sodDate.getDate()).toBe(nowDate.getDate());
			});

			it('should be at the beginning of the day', function() {
				expect(sodDate.getHours()).toBe(0);
				expect(sodDate.getMinutes()).toBe(0);
				expect(sodDate.getSeconds()).toBe(0);
				expect(sodDate.getMilliseconds()).toBe(0);
			});
		});

		describe('startOfDay(sameTimeYesterday)', function() {
			var MS_PER_DAY = 1000 * 60 * 60 * 24;
			var sameTimeYesterday = Date.now() - MS_PER_DAY;
			var sod = h.startOfDay(sameTimeYesterday);
			var sodDate = new Date(sod);
			var nowDate = new Date();

			it('should return a timestamp', function() {
				expect(isInteger(sod)).toBe(true);
			});

			it('should be sometime yesterday', function() {
				expect(sodDate.getDay()).toBe(h.mod(nowDate.getDay() - 1, 7));
			});

			it('should be at the beginning of the day', function() {
				expect(sodDate.getHours()).toBe(0);
				expect(sodDate.getMinutes()).toBe(0);
				expect(sodDate.getSeconds()).toBe(0);
				expect(sodDate.getMilliseconds()).toBe(0);
			});
		});
	});
})();