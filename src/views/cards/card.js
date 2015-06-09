/* global DOM, app, h */
(function() {
	'use strict';

	function renderCard(card) {
		var studyDates = card.studyDates ? card.studyDates.slice(0) : [];

		// check checkbox if studied today
		var checked =
			// if studied at all
			studyDates.length >= 1 &&
			// if studied today
			h.getDayDiff(studyDates[studyDates.length - 1], Date.now()) === 0;



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
				'due ' + h.daysAgo(card.priority) :
				// else
				'not yet studied';



		// render li
		var li = DOM.buildNode({el: 'li', kids: [
			{ _className: 'controls', kids: [
				{
					el: 'input', type: 'checkbox',
					_className: 'bigcheck hide-label', _id: 'studied-' + card._id,
					_checked: checked, _disabled: checked,
					on_change: ctrl.markCardStudied
				},
				{ el: 'label', for: 'studied-' + card._id, kid: 'studied today' },
				{ el: 'button', kid: '×', _className: 'delete', _title: 'delete', on_click: ctrl.deleteCard }
			] },
			{ el: 'h3', _className: 'card-title', kid: card.text },
			{ _className: 'card-header', kids: [
				{ el: 'span', _className: 'tag due-msg', kid: dueMsg }
			] }
		] });

		return li;
	}

	app.renderers.card = renderCard;
})();