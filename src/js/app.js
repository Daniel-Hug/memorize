/* global h */
/* exported setPriority */
(function() {
	'use strict';



	/* app global
	**************************************/

	var app = window.app = {
		renderers: {},
		views: {}
	};



	/* app functions
	**************************************/

	/*
		takes an array of timestamps
		returns num days overdue
	*/
	app.getPriority = function getPriority(studyDates) {
		var integer;

		// if studied yet
		if (studyDates.length >= 1) {
			// if studied twice
			if (studyDates.length >= 2) {
				var lastDate = studyDates[studyDates.length - 1];
				var lastGap = h.getDayDiff.apply(null, studyDates.slice(-2));
				var dueGap = lastGap * 2;
				var dueDate = h.addDays(lastDate, dueGap);
				integer = h.getDayDiff(dueDate, Date.now()); // now - due = days overdue
				if (integer < 0) integer = 0;
			} else {
				integer = 1;
			}
		} else {
			integer = 0;
		}

		return integer;
	};

	app.setPriority = function setPriority(card) {
		var studyDates = card.studyDates ? card.studyDates.slice(0) : [];
		card.priority = app.getPriority(studyDates);
	};

})();