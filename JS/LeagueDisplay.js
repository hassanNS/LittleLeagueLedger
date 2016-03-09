var current_league_object = "75bd903ae7b64b4982baa2fa8b8eb674";
var cLeague;
var ws = new cloudmine.WebService({
      appid: 'c7073eb36352472e9d570cfe0a135367',
      apikey: '9ae6c9cc635641d683007bd107ad582a'
});

populateLeagueDisplay();

// Get the right league.
function populateLeagueDisplay() {
	ws.get(current_league_object).on('success', function(data, response) {
		for(var id in data) { 
			cLeague = data[id]['current_league']; 
		}
		var d = {
			current_league: cLeague
		}

		var source = $("#league-title-template").html(); 
	    var template = Handlebars.compile(source); 
	    $('.leagueTitle').append(template(d));
	    populateTeams();  		
	});
}

function populateTeams() {
	console.log(cLeague);
	ws.search('[type="team", league="'+cLeague+'"]').on('success', function(data, response) {
		console.log(data);
		var teamObj = {};
		var teamArray = new Array();
		for(var id in data) {
			teamArray.push(data[id]);
		}
		teamObj = {
			teams: teamArray
		}

		var source = $("#team-list-template").html(); 
	    var template = Handlebars.compile(source); 
	    $('.team-list-scroller').append(template(teamObj));
	});
}