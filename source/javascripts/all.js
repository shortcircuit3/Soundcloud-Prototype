//= require_tree .

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

(function($){

	// Global vars
	var waveLength = 366;
	var playedLength = 200;

	// Append each single bars to div to create full wave
	for ( var i = 0; i < waveLength; i++ ) {
		var rand = randomFromTo(40, 80);
		var mTop = 80 - rand;
		$('.wave').append('<div class="bar" id="bar-' + i + '" style="height:' + rand + 'px; margin-top: ' + mTop + 'px"></div>');
	}

	// Added played class to bars
	for ( var p = 0; p < playedLength; p++ ) {
		$('.bar:eq(' + p + ')').addClass('played');
	}

	// Cache the .wave container position
	var containerPos = $('.wave').offset();
	
	// Loop through each image and highlight the relative sound bar showing it has a comment
	$('.comment-avatars img').each(function(index) {
		// Find the center of each image
		var distanceFromLeft = $(this).css('left'); // Get distance from left
		distanceFromLeft = distanceFromLeft.substring(0, distanceFromLeft.length - 2); // Remove 'px'
		distanceFromLeft = parseInt(distanceFromLeft, 10); // Convert string to integer
		avatarCenter = distanceFromLeft + 15; // Find center of avatar
		// Find relative bar and add class
		$('.wave').find('.bar').each(function(index){
			var inputPos = $(this).offset(); // Get the bars position
			relativeOffset = {
				left: inputPos.left - containerPos.left // The relative position from the left of .wave
			};
			var barDist = relativeOffset.left; // A more sematic name
			// Find the relative bar (+/- 1px)
			if( Math.abs(avatarCenter - barDist) <= 1){
				var id = $(this).attr('id'); // Get the ID
				$('#' + id).addClass('has-comment'); // Add class '.has-comment' to the relative bar
			}
		});

	});

})(jQuery);