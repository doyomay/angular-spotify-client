import angular from 'angular';
import uiRouter from 'angular-ui-router';

//Styles
import '../style/app.scss'

//Components
import Common from './commom/common';
import Services from './services/services';
import Components from './components/components';
import Filters from './filters/filters'

angular.module('app', [
    uiRouter,
    Services,
    Common,
    Components,
    Filters
]).config($locationProvider => {
    $locationProvider.html5Mode(true).hashPrefix('!');
});