/* global DDS, h, app */

(function() {
	'use strict';



	/*====================*\
	)  render cards list  (
	\*====================*/


	function compareDesc(prop, a, b) {
		if (b[prop] < a[prop]) return -1;
		if (b[prop] > a[prop] || b.i > a.i) return 1;
		if (b.i < a.i) return -1;
	}

	app.views.walletList = app.cards.render(new DDS.DOMView({
		renderer: app.renderers.card,
		parent: h.qs('#cards'),
		sort: function sortCards(cards) {
			return cards.sort(compareDesc.bind(null, 'priority'));
		}
	}));



	/*====================*\
	)  Handle new entries  (
	\*====================*/

	h.on(h.qs('#form-add-card'), 'submit', function(event) {
		// Don't submit the form
		event.preventDefault();

		// Add new entry to model
		app.cards.add({
			text: this.text.value,
		});

		// clear fields
		this.text.value = '';
	});

})();