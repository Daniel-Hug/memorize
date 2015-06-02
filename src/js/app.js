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
		// not studied yet
		if (studyDates.length < 1) return 0;

		var lastDate = studyDates[studyDates.length - 1];
		var dueGap =
			studyDates.length >= 2 ?
				h.getDayDiff.apply(null, studyDates.slice(-2)) * 2 :
				1;
		var dueDate = h.addDays(lastDate, dueGap);
		return h.getDayDiff(dueDate, Date.now()); // now - due = days overdue
	};

	app.setPriority = function setPriority(card) {
		var studyDates = card.studyDates ? card.studyDates.slice(0) : [];
		card.priority = app.getPriority(studyDates);
	};

})();