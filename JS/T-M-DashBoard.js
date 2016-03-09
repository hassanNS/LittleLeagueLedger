var playerdata = {};

var ws = new cloudmine.WebService({
      appid: 'c7073eb36352472e9d570cfe0a135367',
      apikey: '9ae6c9cc635641d683007bd107ad582a'
});
populateRoster();

function populateRoster() {
    ws.search('[type="player", team="Liverpool"]').on('success', function(data, response) {
      // Only the address object will be returned, but still keyed by the object id.
      console.log("fetched");
      playerArray = new Array();
      for(var id in data)
      {
        playerArray.push(data[id]);
      }
      console.log(playerArray);
      playerdata = {
        players: playerArray
      }
      console.log("Player Data");
      console.log(playerdata);

      var source = $("#team-roster-template").html(); 
      var template = Handlebars.compile(source); 
      $('.teamContainer').append(template(playerdata));
      bindCreatePlayer();
    });
}

function bindCreatePlayer() {
    $( "#newplayerform" ).submit(function(event){
         var pName = $("#pName").val();
         var names = pName.split(" ");
         var firstName = "";
         var lastName = "";

         if (names.length === 2) {
            firstName = names[0];
            lastName = names[1];
         }
         else if (names.length === 1) {
            lastName = names[0];
         }

         var pNumber = $("#pNumber").val();
         var pPosition = $("#pPosition").val();

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

         event.preventDefault();
         ws.set(""+pID, {
            id: ""+pID,
            type:"player",
            team:"Liverpool",
            league:"Barclays Premier League",
            number: pNumber,
            first_name: firstName,
            last_name: lastName,
            position: pPosition,
            goals: "0",
            shots: "0",
            shots_on_target: "0",
            assists: "1",
            saves: "0",
            fouls: "3",
            yellow_card: "0",
            red_card: "0"
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

function deletePlayer(pID) {
    console.log(pID);
    ws.search('[id="'+pID+'"]').on('success', function(data, response) { 
        $("#"+pID).remove();
        for(var id in data)
        {
            ws.destroy(null, { query: '[id="'+pID+'"]' }).on('success', function(data, response) {
              console.log("DELETE SUCCESS");
              location.reload();
            });
        }
    }); 
}





