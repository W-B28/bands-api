let counterDel = 0;

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "7056e6dd17msh25104d3088e6a35p1a8700jsn283a0a6cb7e7"
	}
}

$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();
		settings.url = "https://deezerdevs-deezer.p.rapidapi.com/search?q="
		settings.url += searchText
		e.preventDefault();
		$.ajax(settings).done(function (response) {
			console.log(response);
			let bands = response['data'][0]['artist'];
			let tempName = response['data'][0]['artist']['name'];
			let tempPic = response['data'][0]['artist']['picture_big'];
			let output = '';

			output += `
			<div class="col-4" id="`+ counterDel +`">
				<div class="well text-center">
					<h3 id="heading-name">${tempName}</h3>
					<img src="${tempPic}" />
					<button data-deleteId="`+ counterDel +`" class="deleteBand btn btn-outline-danger text-center my-4">Delete</button>
				</div>
			</div>
			`;
			
			counterDel++;

			const currentContent = $('#bands').html();
			$('#bands').html(output + currentContent)


			$('.deleteBand').click(function (e) {
				console.log(e)
				console.log(e.currentTarget.attributes[0]['value'])
				$('#'+ e.currentTarget.attributes[0]['value']).remove();
			});
		});
	});
});
