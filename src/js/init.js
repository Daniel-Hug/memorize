/* global app, DDS, h, Obj */
(function() {
	'use strict';



	/* Setup flash card model
	**************************************/

	// Grab flash cards from localStorage (recent last):
	var cards = h.storage.get('cards') || [];

	// calculate and set a priority for each card
	cards.forEach(app.setPriority);

	app.cards = new DDS(cards);

	// keep db updated when model changes
	app.cards.on('any', function() {
		// exclude priority property from db records
		h.storage.set('cards', app.cards.objects.map(function(card) {
			var cardClone = Obj.extend(card);
			delete cardClone.priority;
			return cardClone;
		}));
	});



	/* Bible reference linker
	**************************************/

	window.refTagger = {
		settings: {
			//bibleVersion: 'ESV',
			noSearchTagNames: ['h1','h2']
		}
	};

	(function(d, t) {
		var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
		g.src = 'http://api.reftagger.com/v2/RefTagger.js';
		s.parentNode.insertBefore(g, s);
	}(document, 'script'));

})();