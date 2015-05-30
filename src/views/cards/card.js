/* global DOM, app, h */
(function() {
	'use strict';

	function renderCard(card) {
		var studyDates = card.studyDates ? card.studyDates.slice(0) : [];
		var checked;


		// check checkbox if studied today

		// if studied at all
		if (studyDates.length >= 1) {
			var numDaysSinceLastStudy = h.getDayDiff(studyDates[studyDates.length - 1], Date.now());

			// if studied today
			checked = numDaysSinceLastStudy === 0;
		} else {
			checked = false;
		}


		// render li
		var li = DOM.buildNode({el: 'li', kids: [
			{ _className: 'card-header', kids: [
				// if studied at all
				card.studyDates && card.studyDates.length ?
					// show when it's due for review
					'due ' + h.daysAgo(-card.priority) :

					'not yet studied'
			] },
			{ el: 'input', type: 'checkbox', _checked: checked, _disabled: checked, on_change: function markCardStudied() {
				this.disabled = true;
				studyDates.push(Date.now());
				app.cards.edit(card, {
					studyDates: studyDates,
					priority: app.getPriority(studyDates)
				});
				// fix: recalculate card priority
			} },
			{ el: 'button', kid: '×', _className: 'delete', _title: 'delete', on_click: function deleteCard() {
				app.cards.remove(card);
			} },
			card.text
		] });

		return li;
	}

	app.renderers.card = renderCard;
})();