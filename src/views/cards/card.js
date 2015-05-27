/* global DOM, app */
(function() {
	'use strict';

	function renderCard(card) {
		var li = DOM.buildNode({el: 'li', kids: [
			{ el: 'button', kid: '×', _className: 'delete', on_click: function deleteCard() {
				app.cards.remove(card);
			} },
			card.text
		] });

		return li;
	}

	app.renderers.card = renderCard;
})();