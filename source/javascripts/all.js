//= require_tree .

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

(function($){

	// Global vars
	var waveLength = 366;
	var playedLength = 200;

	// Global functions
	function position_comment_highlight() {
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
	}


	// DOCUMENT.READY()
	$(document).ready(function() {
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

		// Position comment highlight
		position_comment_highlight();

		// Return false after submit
		$('#comment-form').submit(function() {
			// Do something
			return false;
		});


	});
	


	$(window).load(function () {

		// Runs after player animation finishes
		function loadTheRest(){
			TweenMax.to($('header'), 0.4, {css:{opacity:"1"}, ease:Power4.easeOut });
			TweenMax.to($('.comment-avatars'), 0.4, {css:{opacity:"1"}, ease:Power4.easeOut });
			TweenMax.to($('.comment-field'), 0.4, {css:{opacity:"1"}, ease:Power4.easeOut });
			$('body').removeClass('loading');

			// Comment Pop up
			$("body").on("mouseenter", ".comment-avatars img", function(){
				// Get comment data
				var name = $(this).data('name');
				var comment = $(this).data('comment');
				$('.comment-box').find('.name-text').text(name);
				$('.comment-box').find('.comment-text').text(comment);
				// Show the comment
				var commentHeight = $('.comment-box').outerHeight();
				var containerPos = $('.wave').offset(); // Get the container offset
				var inputPos = $(this).offset(); // Get the images offset
				relativeOffset = {
					left: inputPos.left - containerPos.left // The relative position from the left of the container
				};
				var commentDist = relativeOffset.left; // A more sematic name
				// Show the comment
				$('.comment-box').css({
					'bottom': (commentHeight - 1) + 'px',
					'left': commentDist + 'px'
				});
			});

			$("body").on("mouseleave", ".comment-avatars img", function(){
				// Reset the comment
				$('.comment-box').css('bottom', '-1px');
			});

		}
		
		//$('.player').css('height','219px');
		if ($(window).width() >= 500) {
			TweenMax.to($('.player'), 0.9, {css:{height:"264px"}, ease:Power4.easeOut, onComplete:loadTheRest });
		} else {
			TweenMax.to($('.player'), 0.9, {css:{height:"219px"}, ease:Power4.easeOut, onComplete:loadTheRest });
		}
		
	});

	$(window).resize(function() {

		if ($(window).width() >= 500) {
			position_comment_highlight();
			$('.player').css('height','264px');
		} else {
			$('.player').css('height','219px');
		}

	});

})(jQuery);