$(document).ready(function() { 
	$('.btn-success').click(function() { 
		if ($('#text').val().length != 0) { 
			var x = $('.container').html(); 
			var y = 
`<div class="alert alert-success alert-dismissible fade in"> 
<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a> 
				` + $('#text').val() + `</div>`; 
			$('.container').html(y + x); 
			$('#text').val(""); 
		} else alert("Enter some Text!"); 
	}); 
	// When Task is clicked 
	$(document).on('click', '.alert', function() { 
		if ($(this).css('text-decoration-line') == "none") 
			$(this).css('text-decoration-line', 'line-through'); 
		else 
			$(this).css('text-decoration-line', 'none'); 
	}); 
}); 
