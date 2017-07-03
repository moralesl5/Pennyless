$(() => {

	console.log('script running');

	const lat = $('.lat').attr('data_id');
	const long = $('.long').attr('data_id')
    console.log(`Lat: ${lat}`);
    console.log(`Long: ${long}`);

    function initMap() {
        var uluru = {
            lat: 40.739885,
            lng: -73.990082
        };
        // var marker1 = {
        //     lat: document.getElementById('lat').value(),
        //     long: document.getElementById('long').value()
        // }
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: uluru
        });
        // var marker = new google.maps.Marker({
        //     position: marker1,
        //     map: map
        // });
    }



});