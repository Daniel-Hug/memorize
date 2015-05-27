/* global DDS, h */
(function() {
	'use strict';




	/* app global
	**************************************/

	var app = window.app = {
		renderers: {},
		views: {}
	};



	/* Setup flash card model
	**************************************/

	// Grab flash cards from localStorage (recent last):
	app.cards = new DDS(h.storage.get('cards') || []);

	// keep db updated when model changes
	app.cards.on('any', function() {
		h.storage.set('cards', app.cards.objectsObj);
	});



	/* Bible reference linker
	**************************************/

	window.refTagger = {
		settings: {
			//bibleVersion: 'ESV'
		}
	};

	(function(d, t) {
		var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
		g.src = '//api.reftagger.com/v2/RefTagger.js';
		s.parentNode.insertBefore(g, s);
	}(document, 'script'));

})();