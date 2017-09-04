import angular from 'angular'
import uiRouter from 'angular-ui-router';
import searchComponent from './search.component'

let searchModule = angular.module('search', [
    uiRouter
])
    .component('appSearch', searchComponent)
    .name;

export default searchModule;