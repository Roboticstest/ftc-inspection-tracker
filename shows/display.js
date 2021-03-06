function(doc, req) {
  // !json templates.display
  // !json templates.notfound

  var Handlebars = require('views/lib/handlebars');
  Handlebars.registerHelper('slugify', function(str) {
    return str.toLowerCase().replace(' ','-').replace('[^a-zA-Z\d-]','');
  });


  if(doc == null) {
    var template = Handlebars.compile(templates.notfound);
    return {'code': 404, 'body': template({'title': 'Event Not Found',
        'message': 'Event &lsquo;' + req['query']['id'] + '&rsquo; Not Found'})};
  }

  // we only show html
  var template = Handlebars.compile(templates.display);

  var data = doc.config;

  data.groupedTeams = [];
  data.colSize = 12/data.colCount;
  var teamList = data.teams.slice(0);
  teamList.sort(function (a, b) {
      return a - b;
  });

  while (teamList.length > 0) {
      data.groupedTeams.push(teamList.splice(0, Math.ceil(data.teams.length / data.colCount)));
  }
// return JSON.stringify(req);
  return template(data);
}
