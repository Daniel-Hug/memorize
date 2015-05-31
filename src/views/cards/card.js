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



		// controller functions

		var ctrl = {
			markCardStudied: function markCardStudied() {
				this.disabled = true;
				studyDates.push(Date.now());
				app.cards.edit(card, {
					studyDates: studyDates,
					priority: app.getPriority(studyDates)
				});
			},
			deleteCard: function deleteCard() {
				app.cards.remove(card);
			}
		};



		var dueMsg =
			// if studied at all
			card.studyDates && card.studyDates.length ?
				// show when it's due for review
				'due ' + h.daysAgo(-card.priority) :
				// else
				'not yet studied';



		// render li
		var li = DOM.buildNode({el: 'li', kids: [
			{ _className: 'controls', kids: [
				{ el: 'input', type: 'checkbox', _checked: checked, _disabled: checked, on_change: ctrl.markCardStudied },
				{ el: 'button', kid: '×', _className: 'delete', _title: 'delete', on_click: ctrl.deleteCard }
			] },
			{ _className: 'card-header', kids: [
				{ el: 'span', _className: 'tag due-msg', kid: dueMsg }
			] },
			card.text
		] });

		return li;
	}

	app.renderers.card = renderCard;
})();