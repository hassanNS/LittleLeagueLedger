var source = $("#league-item-template").html(); 
var template = Handlebars.compile(source); 

var data = { 
    leagues: [
        {
            league_title: "Barclays Premier League (BPL)",
            stat_status: "Update Stats",
            next_match: "Next Match: Feb 12, 2016",
            top_team: "Liverpool",
            week_number: "2",
            number_teams: "14"

        },
        {
            league_title: "Bangla Boys League (BBL)",
            stat_status: "Update Stats",
            next_match: "Next Match: Feb 15, 2016",
            top_team: "---",
            week_number: "1",
            number_teams: "5"
        }
    ]
    /*users: [ { 
        person: {
            firstName: "Garry", 
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa" 
    }]*/
}; 

/*Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});*/

$('body').append(template(data));