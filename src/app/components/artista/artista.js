import angular from 'angular';
import uiRouter from 'angular-ui-router';
import artistaComponent from './artista.component';

let artistaModule = angular.module('artist', [
    uiRouter
]).config($stateProvider => {
    $stateProvider
        .state('artista', {
            url: '/artist/{artistId}',
            component: 'artist'
        });
}).component('artist', artistaComponent).name;

export default artistaModule;