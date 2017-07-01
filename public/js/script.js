$(() => {
    console.log("JS 🏃");

    // const addressSplit = (address) =>{
    // 	let add = this;
    // 	for (let i = 0; i < add.length; i++){
    // 		if (address[i] === " "){
    // 			address[i] = "+";
    // 		}
    // 	}

    // }

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


        // console.log("splitting address", addressSplit($('.new-place-address').val()));
    })



}); // END OF jQUERY
