$(()=>{
	console.log("JS 🏃");

	// New place post
	$('.new-place-form').on('submit', e =>{
		e.preventDefault();
		console.log('Submit button pressed!!');

		// Grab values from form
		const name = $('.new-place-name').val(),
			  lat = 40.739885,
			  long = -73.990082,
			  cat = $('.new-place-cat').val(),
			  notes = $('.new-place-notes').val();

		const newPlaceData = {
			name: name,
			lat: lat,
			long: long,
			cat: cat,
			notes: notes
		};

		console.log('New place data is', newPlaceData);

		// SEND AJAX TO MAKE NEW PLACE

		$.ajax({
			method: 'POST',
			url: '/search',
			data: newPlaceData,
			success: response =>{
				console.log('AJAX RESPONSE', response);
				window.location.replace(`/search/`);
			}, error: msg =>{
				console.log('error message in ajax', msg)
			}

		})
	})

});// END OF jQUERY