var teamDict;
var current_league_object = "75bd903ae7b64b4982baa2fa8b8eb674";
var ws = new cloudmine.WebService({
      appid: 'c7073eb36352472e9d570cfe0a135367',
      apikey: '9ae6c9cc635641d683007bd107ad582a'
});

populateLeagues();
populateTeamsSelectOptions();
addCreateLeagueFormFunctions();
bindCreateTeam();
bindCreateLeague();

function sendLeagueName(name) {
	ws.update(current_league_object, {'current_league': name }).on('success', function(data, response) {
	  		console.log("UPDATED!");
	  		parent.location = "LeagueDisplay.html";
	  
	});
}

function bindLeagueItemButtons() {
	$("#update-view-stat").click(function(){
		var statStatus = $("#update-view-stat").text();
		console.log(statStatus);
		if (statStatus == "Update Stats")
		{
			parent.location = "UpdateStatsView.html";

		}
		else {

		}
	});

/*
	// Send League Display the correct league to display 
	$('#league-item-heading').click(function() {
		var cleague = $(".panel-title").text();
    	ws.update(current_league_object, { 'current_league': cleague })
    		.on('success', function(data, response) {
		  		console.log("UPDATED!");
		  		parent.location = "LeagueDisplay.html";
		  
		}).on('error', function(err, response) {
		  console.log(err);
		}).on('complete', function(data, response) {
		  console.log('finished request', data)
		});
	});
*/
}

function populateLeagues() {
	ws.search('[type="league"]').on('success', function(data, response) {

      // Only the address object will be returned, but still keyed by the object id.
      var leagueArray = new Array();
      for(var id in data)
      {
      	 leagueArray.push(data[id]);
      }
      var leagueData = {
      	leagues:leagueArray
      }
      console.log(leagueArray.length);

      Handlebars.registerHelper('json', function(context) {
    	return JSON.stringify(context);
	  });

      var source = $("#league-item-template").html(); 
	  var template = Handlebars.compile(source); 
	  $('.league-items').append(template(leagueData));
	 
	  bindLeagueItemButtons();
    });
}


function populateTeamsSelectOptions() {
	ws.search('[type="team", league=""]').on('success', function(data, response) {
      // Only the address object will be returned, but still keyed by the object id.
      console.log("fetched");
      for(var id in data)
      {
       	 var team = data[id];
       	 // Populate the unselected teams select option
       	 $("#unselectedTeams").append($('<option>', {
       	 	value: id,
       	 	text: team['name']
       	 }));
      }
      teamDict = data;
    });
}


function addCreateLeagueFormFunctions() {
	$("#toSelectedTeams").click(function(){
		// Gives me a list of id's
		var selectedTeams = $("#unselectedTeams").val();

		for (var i in selectedTeams) {
			// Remove each of the elements that are selected.
			$("#unselectedTeams option").each(function(){
				if($(this).val() == selectedTeams[i]) {
					$(this).remove();
				}
			});

			// copy over the selected teams to the selected options
			$('#selectedTeams').append($('<option>', {
    			value: selectedTeams[i],
    			text: teamDict[selectedTeams[i]]['name']
			}));
		}
		updateTotalGamesOnCreateLeagueForm();
	});// onclick

	$("#toUnselectedTeams").click(function(){
		// Gives me back a list of ids.
		var unselectedTeams = $("#selectedTeams").val();

		for (var i in unselectedTeams) {
			// Remove each of the elements that are selected.
			$("#selectedTeams option").each(function(){
				if($(this).val() == unselectedTeams[i]) {
					$(this).remove();
				}
			});

			// copy over the selected teams to the unselected options
			$('#unselectedTeams').append($('<option>', {
    			value: unselectedTeams[i],
    			text: teamDict[unselectedTeams[i]]['name']
			}));
		}
		updateTotalGamesOnCreateLeagueForm();
	});// onclick

	$("#matchesPerTeam").change(function(){
		updateTotalGamesOnCreateLeagueForm();
	});
}

function updateTotalGamesOnCreateLeagueForm() {
	var mpt = parseInt($("#matchesPerTeam").val());
	var totalgames = mpt * $("#selectedTeams option").length;
	console.log(totalgames);
	$("#numGames").text("Total Games: " + totalgames);
}

function bindCreateTeam() {
	$( "#submitTeam" ).click(function(event){
			event.preventDefault();
			console.log("I clicked");
			var teamName = $("#teamName").val();
			var manager_email = $("#managerEmail").val();
			var teamColor = $("#teamColor").val();

			var date = new Date();
			var components = [
	            date.getYear(),
	            date.getMonth(),
	            date.getDate(),
	            date.getHours(),
	            date.getMinutes(),
	            date.getSeconds(),
	            date.getMilliseconds()
	         ];

	         var pID = components.join("");

	         console.log("Do you even?");

	         ws.set(""+pID, {
	            id: ""+pID,
	            type: "team",
	            name: teamName,
	            manager_email: manager_email,
	            color: teamColor,
	            league: ""
	         }).on('success', function(data, response) { 
	          console.log("on success")
	          console.log(data);
	          location.reload();
	        }).on('error', function(err, response) {
	            console.log(err);
	        }).on('complete', function(data, response) {
	          // Do any required clean up after api call
	        });
	});
}

function bindCreateLeague() {
	$( "#submitLeague" ).click(function(event){
			event.preventDefault();

			var lName = $("#leagueName").val();
			var numberOfTeams = 0;
			$("#selectedTeams option").each(function()
			{
				numberOfTeams += 1;
			});

			// Update each of the team's leagues.
			$("#selectedTeams option").each(function()
			{
				var objId = $(this).val();

				ws.update(objId, { league: lName }).on('success', function(data, response) {
			  	console.log(data);
				  
				}).on('error', function(err, response) {
				  console.log(err);
				}).on('complete', function(data, response) {
				  //console.log('finished request', data)
				});
			});

			var playersPerTeam = $("#playerPerTeam").val();
			var matchesPerTeam = $("#matchesPerTeam").val();
			var totalgames = $("#numGames").text().split(" ")[2];
			var startDate = $("#leagueStartDate").val();
			var matchesEvery = $("#matchesEveryNDays").val();
			var startTime = $("#gameStartTime").val();

			console.log("pperteam: " + playersPerTeam);
			console.log("matchesPerTeam: " + matchesPerTeam);
			console.log("totalgames: " + totalgames);
			console.log("matchesEvery: " + matchesEvery);
			console.log("startTime: " + startTime);

			var date = new Date();
			var components = [
	            date.getYear(),
	            date.getMonth(),
	            date.getDate(),
	            date.getHours(),
	            date.getMinutes(),
	            date.getSeconds(),
	            date.getMilliseconds()
	         ];

	         var pID = components.join("");
	         
	         ws.set(""+pID, {
	              id: ""+pID,
	              "type": "league",
				  "name": lName,
				  "players_per_team": playersPerTeam,
				  "matches_per_team": matchesPerTeam,
				  "total_matches": totalgames,
				  "start_date": startDate,
				  "matches_every": matchesEvery,
				  "match_start_time": startTime,
				  "next_match_day": startDate,
				  "league_leader": "---",
				  "league_week": "1",
				  "number_of_teams": numberOfTeams,
				  "needs_updating": "View Stats"
	         }).on('success', function(data, response) { 
	          console.log("CREATED LEAGUE")
	          console.log(data);
	          location.reload();
	        }).on('error', function(err, response) {
	            console.log(err);
	        }).on('complete', function(data, response) {
	          // Do any required clean up after api call
	        });
	});
}









