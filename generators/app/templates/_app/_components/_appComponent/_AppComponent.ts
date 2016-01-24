import {Component} from 'angular2/core';

@Component({
    selector: 'app',
    templateUrl: '/components/appComponent/appView.html'
})

export class AppComponent { 
	construct(){
		console.log('App Component successfully loaded');
	}
}