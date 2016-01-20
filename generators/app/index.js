'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the best ' + chalk.red('generator-angular-2-skeleton') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?',
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  scaffoldFolders: function(){
    this.mkdir("app");
    this.mkdir("app/assets");
    this.mkdir("app/core");
    this.mkdir("app/components");
    this.mkdir("app/services");
    this.mkdir("dist");
  },

  copyMainFiles: function(){
    this.copy("_index.html", "index.html");
    this.copy("_gulpfile.js", "gulpfile.js");
    this.copy("_package.json", "package.json");    
 
    var context = { 
        site_name: this.props.appName 
    };
 
    this.template("_index.html", "index.html", context);
},
runNpm: function(){
    var done = this.async();
    this.npmInstall("", function(){
        console.log("\nEverything Setup !!!\n");
        done();
    });
}

 
});
