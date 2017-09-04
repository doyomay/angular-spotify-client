import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-tooltips';
import 'angular-locker';
import albumComponent from './album.component';

let albumModule = angular.module('album', [
    uiRouter,
    'angular-locker',
    '720kb.tooltips'
]).config($stateProvider => {
    $stateProvider
        .state('album', {
            url: '/album/{albumId}',
            component: 'album'
        });
}).component('album', albumComponent).name;

export default albumModule;