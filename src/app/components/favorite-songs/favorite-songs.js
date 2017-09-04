import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-locker';
import favoriteSongsComponent from './favorite-songs.component';

let favoriteSongsModule = angular.module('favoriteSongs', [
    uiRouter,
    'angular-locker'
]).component('appFavoriteSongs', favoriteSongsComponent).name;

export default favoriteSongsModule;