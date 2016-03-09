var playerdata = {};

var ws = new cloudmine.WebService({
      appid: 'c7073eb36352472e9d570cfe0a135367',
      apikey: '9ae6c9cc635641d683007bd107ad582a'
});
populateTable();

function populateTable() {
    ws.search('[type="player"]').on('success', function(data, response) {
      
      lplayerArray = new Array();
      wplayerArray = new Array();

      for(var id in data)
      {
        var p = data[id];
        if (p['team'] == "Liverpool")
            lplayerArray.push(p);
        else
            wplayerArray.push(p)
      }

      playerdata = {
        team1: "Liverpool",
        team2: "West Ham United",
        liverpool_players: lplayerArray,
        westham_players: wplayerArray
      }

      console.log("Player Data");
      console.log(playerdata);

      var source = $("#update-stats-template1").html(); 
      var template = Handlebars.compile(source); 
      $('.stat-container').append(template(playerdata));

      var source = $("#update-stats-template2").html(); 
      var template = Handlebars.compile(source); 
      $('.stat-container').append(template(playerdata));
    });
}