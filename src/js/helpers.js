(function() {
	'use strict';



	/* helpers
	**************************************/

	// Loop through collections:
	function each(arr, fn, scope) {
		for (var i = 0, l = arr.length; i < l; i++) {
			fn.call(scope, arr[i], i, arr);
		}
	}

	function map(arr, fn, scope) {
		var l = arr.length, newArr = [];
		for (var i = 0; i < l; i++) {
			newArr[i] = fn.call(scope, arr[i], i, arr);
		}
		return newArr;
	}


	// localStorage + JSON wrapper:
	var storage = {
		get: function(prop) {
			return JSON.parse(localStorage.getItem(prop));
		},
		set: function(prop, val) {
			localStorage.setItem(prop, JSON.stringify(val));
		},
		has: function(prop) {
			return localStorage.hasOwnProperty(prop);
		},
		remove: function(prop) {
			localStorage.removeItem(prop);
		},
		clear: function() {
			localStorage.clear();
		}
	};

	var MS_PER_DAY = 1000 * 60 * 60 * 24;

	// takes two timestamps, returns number of days they're apart
	function getDayDiff(a, b) {
		var diff = startOfDay(b) - startOfDay(a);
		return Math.round(diff / MS_PER_DAY);
	}

	// returns timestamp for beginning of the day of the passed timestamp, else beginning of today
	function startOfDay(ts) {
		var date = ts ? new Date(ts) : new Date();
		return date.setHours(0,0,0,0);
	}

	function addDays(ts, numDays) {
		var startOfOriginalDay = startOfDay(+ts);
		return startOfDay(startOfOriginalDay + (numDays + 0.5) * MS_PER_DAY);
	}

	var vb = {};

	//	Accepts a number, a singular noun, and an optional plural noun (plural is inferred using vb.plural if not given):
	//		vb.count(3, 'apple')
	//	Returns the number paired with the correct noun:
	//		"3 apples"
	vb.count = function(num, singular, plural) {
		plural = plural || singular + 's';
		var noun = num === 1 ? singular : plural;
		return num + ' ' + noun;
	};

	// daysAgo(2)  => "2 days ago"
	// daysAgo(2, 'overdue')  => "2 days overdue"
	// daysAgo(1)  => "yesterday"
	// daysAgo(0)  => "today"
	// daysAgo(-1) => "tomorrow"
	// daysAgo(-2) => "in 2 days"
	function daysAgo(days, preposition) {
		preposition = preposition || 'ago';
		return days > 0 ?
			(days > 1 ?
				days + ' days ' + preposition :
				'yesterday') :
			(days < 0 ?
				(days < -1 ?
					'in ' + -days + ' days' :
					'tomorrow') :
				'today');
	}



	/* DOM helpers
	**************************************/

	// Get elements by CSS selector:
	function qs(selector, scope) {
		return (scope || document).querySelector(selector);
	}

	function qsa(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}


	// Add and remove event listeners:
	function on(target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	}

	function off(target, type, callback, useCapture) {
		target.removeEventListener(type, callback, !!useCapture);
	}

	function removeNode(node) {
		node.parentNode.removeChild(node);
	}

	function renderMultiple(arr, renderer, parent) {
		var renderedEls = map(arr, renderer);
		var docFrag = document.createDocumentFragment();
		for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
		if (parent) parent.appendChild(docFrag);
		else return docFrag;
	}

	function prependAInB(newChild, parent) {
		parent.insertBefore(newChild, parent.firstChild);
	}



	/* export
	**************************************/

	window.h = {
		each: each,
		map: map,
		storage: storage,
		qs: qs,
		qsa: qsa,
		on: on,
		off: off,
		removeNode: removeNode,
		renderMultiple: renderMultiple,
		prependAInB: prependAInB,
		getDayDiff: getDayDiff,
		startOfDay: startOfDay,
		addDays: addDays,
		vb: vb,
		daysAgo: daysAgo
	};
})();