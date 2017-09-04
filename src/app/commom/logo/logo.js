import angular from 'angular'
import uiRouter from 'angular-ui-router';
import logoComponent from './logo.component'

let logoModule = angular.module('logo', [
    uiRouter
]).component('appLogo', logoComponent).name;

export default logoModule;