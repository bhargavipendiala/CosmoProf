var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var config = require('./nightwatch.conf');
module.exports = {
  write : function(results, options, done) {

    var reportFilename = 'report.html';
    var reportFilePath = path.join(__dirname, options.output_folder, reportFilename);

    // read the html template
      fs.readFile('testsummary.hbs', function(err, data) {
          if (err) throw err;

          var template = data.toString();

          // merge the template with the retest results data
          var html = handlebars.compile(template)({
              launchUrl : config.test_settings.default.launch_url,
              results   : results,
              options   : options,
              timestamp : new Date().toString(),
              browser   : options.filename_prefix.split('_').join(' ')
          });

          // write the html to a file
          fs.appendFile(reportFilePath, html, function(err) {
              if (err) throw err;
              console.log('Report generated: ' + reportFilePath);
              done();
          });
      });
/*    fs.readFile('html-reporter.hbs', function(err, data) {
      if (err) throw err;

      var template = data.toString();

      // merge the template with the retest results data
      var html = handlebars.compile(template)({
        results   : results,
        options   : options,
        timestamp : new Date().toString(),
        browser   : options.filename_prefix.split('_').join(' ')
      });

      // write the html to a file
      fs.appendFile(reportFilePath, html, function(err) {
        if (err) throw err;
        console.log('Report generated: ' + reportFilePath);
        done();
      });
    });*/
  }
};
