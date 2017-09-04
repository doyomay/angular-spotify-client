import angular from 'angular';
import authService from './auth/auth.service.js';
import ScrollInfiniteFactory from './scrollinfinite/scrollInfinite.services';
import SpotifyFactory from './spotify/spotify.provider';
import WebPlayerFactory from './webplayer/webplayer.services';

let servicesModule = angular.module('app.services', [])
    .factory('authService', authService)
    .factory('ScrollInfiniteService', ScrollInfiniteFactory)
    .factory('SpotifyFactory', SpotifyFactory)
    .factory('WebPlayerFactory', WebPlayerFactory)
    .name;

export default servicesModule;