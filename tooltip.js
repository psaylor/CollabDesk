function addBrowsepaneTooltips () {
	// Tooltip for important icon in browse pane
	$('.icon-exclamation-sign').tooltip({
		trigger: 'hover',
		placement: 'top',
		title: 'High Priority',
		delay: 200,
		container: 'body',
	});

	// Tooltip for note icon in browse pane
	$('.icon-reorder').tooltip({
		trigger: 'hover',
		placement: 'top',
		title: 'Note',
		delay: 200,
		container: 'body',
	});

	// Tooltip for alert desk captain icon in browse pane
	$('.icon-user').tooltip({
		trigger: 'hover',
		placement: 'top',
		title: 'Desk Captain Notified',
		delay: 200,
		container: 'body',
	});

}

function addReadPaneTooltips () {
	$('.tag').click(function () {
		trigger: 'hover',
		placement: 'top',
		title: 'Click to Search',
		delay: 200,
		container: 'body',
	});
}