

$(() => {
    console.log("JS 🏃");

    // New place post
    $('.new-place-form').on('submit', e => {
        e.preventDefault();
        console.log('Submit button pressed!!');


        // Grab values from form
        const name = $('.new-place-name').val(),
            address = $('.new-place-address').val(),
            cat = $('.new-place-cat').val(),
            notes = $('.new-place-notes').val();

        // Converting address string
        let cleanAddress = address.replace(/[ ]/gi, "+");

        console.log(cleanAddress)

        const newPlaceData = {
            name: name,
            address: cleanAddress,
            cat: cat,
            notes: notes
        };


        console.log('New place data is', newPlaceData);

        // SEND AJAX TO MAKE NEW PLACE

        $.ajax({
            method: 'POST',
            url: '/search',
            data: newPlaceData,
            success: response => {
                console.log('AJAX RESPONSE', response);
                window.location.replace(`/search/`);
            },
            error: msg => {
                console.log('error message in ajax', msg)
            }
        })
    }) // END OF NEW PLACE POST

    // SEARCH
    $('#search-form').on('submit', e =>{
    	e.preventDefault();

    	const catPlace = $('#search-place-cat').val();
    	console.log(catPlace);

    	const namePlace = $('#search-name-place').val(); 
    	console.log(namePlace);

    	const searchData = {
    		cat: catPlace,
    		name: namePlace
    	}
    	console.log(searchData)

    	console.log('Field submitted!!!!');


    	// AJAX CALL TO DATABASE
    	$.ajax({
    		method: 'GET',
    		url: `/search/${catPlace}`,
    		success: response =>{
    			console.log('Response from search:', response)
    			window.location.replace('/search/results/');
    		},
    		error: msg =>{
    			console.log('Error in search', msg);
    		}
    	})

    })



}); // END OF jQUERY
