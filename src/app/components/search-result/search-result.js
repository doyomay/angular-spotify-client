import angular from 'angular';
import uiRouter from 'angular-ui-router';
import searchResultComponent from './search-result.component';

let searchResultModule = angular.module('search-result', [
    uiRouter,
]).config($stateProvider => {
    $stateProvider
        .state('search', {
            url: '/search',
            component: 'searchResult'
        });
}).component('searchResult', searchResultComponent).name;

export default searchResultModule;