
$(document).ready(function() {
//the dynamic elements exercise from week6 will be a good reference and example for this exercise

// 1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`. 
//    * We chose animals for our theme, but you can make a list to your own liking.

	var topics = ["Michael McDonald", "Kenny Loggins", "Al Jarreau", "George Benson", 
	"Quincy Jones"];

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.
	
	
	function addButtons(){

		topics.forEach(function(yachtRocker){
			//create buttons from the list and add them to the 'button-div' div here

			var newButton = $("<button>", {class: "yacht-rocker"}).text(yachtRocker);

			$("#button-div").prepend(newButton).css({"float":"left"});

			//combine this into one later

		});

	}

	addButtons();

	$("#add-rocker").click(function(){

		var newButton = $("<button>", {class: "yacht-rocker"}).text($("#input-box").val());

		$("#button-div").prepend(newButton).css({"float":"left"});
		
	})

	var still = "";

	var motion = "";


	$(".yacht-rocker").click(function(){

		$("#add-gifs-divs").empty();

		var rocker = $(this).text();

		rocker = rocker.replace(" ", "+");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        rocker + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			for (x=0; x<=9; x+=1){

				still = response.data[x].images.fixed_height_still.url;

				motion = response.data[x].url;

				$("#add-gifs-divs").append($("<img>", {src: still, alt: rocker, "class": "yr-gif"}).attr("state","still"));

				//console.log(still);

				//console.log(motion);
			}

		})

	});

	$("<img>").click(function(){

		console.log("clicked an image");

		// $(this).attr({
		//     "state": "motion", 
		//    	"src": motion
		// });

	});




// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on). 
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

});