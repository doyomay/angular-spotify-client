import angular from 'angular'
import uiRouter from 'angular-ui-router';
import authComponent from './auth.component'

let authModule = angular.module('auth', [
    uiRouter
]).config($stateProvider => {
    $stateProvider
        .state('appAuth', {
            url: '/callback',
            component: 'appAuth'
        });
}).component('appAuth', authComponent).name;

export default authModule;