/* global DDS, h, app */

(function() {
	'use strict';



	/*====================*\
	)  render cards list  (
	\*====================*/

	app.views.walletList = app.cards.render(new DDS.DOMView({
		renderer: app.renderers.card,
		parent: h.qs('#cards')
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