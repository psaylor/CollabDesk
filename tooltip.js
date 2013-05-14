$(document).ready(function(){

	/* 
		CREATE PANE TOOL TIPS
	*/
	$('#selectTemplate').tooltip( {
		trigger: 'hover',
		placement: 'bottom',
		title: 'Select a template (Opt)',
		delay: 200,
	});

	$('#tags-input').tooltip({
		trigger: 'hover',
		placement: 'bottom',
		title: 'Add searchable tags to your message',
		delay: 200,
	});

	$('#alert-btn').tooltip({
		trigger: 'hover',
		placement: 'bottom',
		title: 'Automatically email this message to the Desk Captain',
		delay: 200,
	});

	$('#ni-btn').click(function() {
		$('#ni-note').toggleClass('hide');
		$('#ni-issue').toggleClass('hide');

	});

	/* 
		READ PANE TOOL TIPS
	*/

	/* 
		BROWSE PANE TOOL TIPS
	*/

});

function addBrowsePaneTooltips() {
	
}

function addReadPaneTooltips() {
	
}