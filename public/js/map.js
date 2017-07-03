$(() => {

	console.log('script running');

	const lat = parseFloat($('.lat').attr('data_id'));
	const long = parseFloat($('.long').attr('data_id'));
    console.log(lat);
    console.log(long);

    function initMap() {

        let center = {
            lat: 40.739885,
            lng: -73.990082
        };
        var marker1 = {
            lat: lat,
            lng: long
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: center
        });
        var marker = new google.maps.Marker({
            position: marker1,
            map: map
        });
    }

    initMap();



});