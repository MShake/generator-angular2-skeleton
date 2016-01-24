'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();


    this.log(yosay(
      'Yo! Let\'s create your professional '+ chalk.red('Angular2') + ' application!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s your project name ?',
      default: this.appname
    }];

    this.prompt(prompts, function (answers) {
      this.props = answers;
      // To access props later use this.props.someOption;
      this.log(answers.name);
      done();
    }.bind(this));
  },

 //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function () {
            this.fs.copy(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js')
            );
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'), {
                    name: this.props.name
                }
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'), {
                    name: this.props.name
                }
            );
            this.fs.copy(
              this.templatePath('bowerrc'),
              this.destinationPath('.bowerrc')
            );
        },

    //Copy application files
    app: function () {
            this.fs.copyTpl(
                this.templatePath('_app/_index.html'),
                this.destinationPath('app/index.html'), {
                    name: this.props.name
                }
            );
            this.fs.copy(
                this.templatePath('_app/_core/_bootstrap/_Bootstrap.ts'),
                this.destinationPath('app/core/bootstrap/Bootstrap.ts')
            );
            this.fs.copy(
                this.templatePath('_app/_components/_appComponent/_AppComponent.ts'),
                this.destinationPath('app/components/appComponent/AppComponent.ts')
            );
            this.fs.copyTpl(
                this.templatePath('_app/_components/_appComponent/_appView.html'),
                this.destinationPath('app/components/appComponent/appView.html'),{
                    name: this.props.name
                }
            );
        },

    //Install Dependencies
    install: function() {
      this.installDependencies();
    }
  },

 
});
