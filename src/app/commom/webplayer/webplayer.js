import angular from 'angular'
import uiRouter from 'angular-ui-router';
import webPlayer from './webplayer.component'

let webplayerModule = angular.module('webplayer', [
    uiRouter
])
    .component('webPlayer', webPlayer)
    .name;

export default webplayerModule;