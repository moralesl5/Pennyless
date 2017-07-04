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
    $('#search-form').on('submit', e => {
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
            success: response => {
                console.log('Response from search:', response)
                window.location.replace('/search/results/');
            },
            error: msg => {
                console.log('Error in search', msg);
            }
        })

    })

    // EDIT
    $('.edit-place-form').on('submit', (e) => {
        e.preventDefault();
        console.log('editing');

        const newName = $('.edit-place-name').val(),
            newCat = $('.edit-place-cat').val(),
            newNote = $('.edit-place-notes').val(),
            id = $('.edit-place-form').attr('placeId');

        const editPlaceData = {
            name: newName,
            cat: newCat,
            note: newNote,
            id: id
        };
        console.log(editPlaceData);

        $.ajax({
            method: 'PUT',
            url: `/search/results/${editPlaceData.id}/edit`,
            data: editPlaceData,
            success: updatedPlace => {
                window.location.replace('/search')
            },
            error: msg => {
                console.log('Error in editing from SCRIPT', msg);
            }

        })
    })

    // DELETE

    $('.delete-place').on('click', e => {
        console.log('deleting!');
        deletePlace($(e.target).attr('placeId'));
    });

    const deletePlace = (id) => {
        $.ajax({
            url: `/search/results/${id}`,
            type: 'DELETE',
            success: res => {
                console.log(res);
                window.location.replace('/search');
            },
            error: err => {
                console.log(err);
            }
        })
    }





}); // END OF jQUERY
