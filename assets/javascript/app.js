
//giphy's search is absolute garbage, so alot of my default buttons are coming up
//with unrelated crap

$(document).ready(function() {

	var myYachtRockers = ["Michael McDonald", "Kenny Loggins", "George Benson", 
	"Boz Scaggs", "James Ingram", "Christopher Cross"];
	
	
	function addButtons(){

		$("#button-div").empty();

		myYachtRockers.forEach(function(yachtRocker){

			$("#button-div").prepend($("<button>", {class: "yacht-rocker"}).text(yachtRocker)
				.css({
					"float":"left",
					"margin": "0px 5px 0px 5px",
					"border-radius": "5px"
				}));

		
		});

	}

	addButtons();

	$("#add-rocker").click(function(){

		myYachtRockers.push($("#input-box").val())

		addButtons();
		
	})

	var still = "";

	var motion = "";


	$("#button-div").on("click", ".yacht-rocker", function(){

		$("#add-gifs-divs").empty();

		var rocker = $(this).text();

		console.log(rocker);

		rocker = rocker.replace(" ", "+");//clean up any spaces

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        rocker + "&api_key=TH0GEBfezZR36QstPFbKKOPXMAeBGylD&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			for (x=0; x<=9; x+=1){

				still = response.data[x].images.fixed_height_still.url;

				motion = response.data[x].images.fixed_height.url;

				$("#add-gifs-divs").append($("<img>", {src: still, alt: rocker, motion: motion, still: still,
				 "class": "yr-gif"}).attr("state","still"));

				$("#add-gifs-divs").append($("<p>").text("Rating: " + response.data[x].rating))
				$("#add-gifs-divs").append($("<br>"))

			}

		})

	});

	$("#add-gifs-divs").on("click", ".yr-gif", function(){ //found out that elements newly added to the dom from a js 
		//file will not take clicks- div exists, so can pull from there

		var state = $(this).attr("state");

		if (state === "still"){

			$(this).attr({
			    "state": "motion", 
			   	"src": $(this).attr("motion")
			});

		} else{

			$(this).attr({
			    "state": "still", 
			   	"src": $(this).attr("still")
			});

		}

	});

});