import angular from 'angular';
import Logo from './logo/logo'
import Search from './search/search';
import Auth from './auth/auth'
import WebPlayer from './webplayer/webplayer';
import Breadcrumb from './breadcrumb/breadcrumb';

let commonModule = angular.module('app.common', [
    Auth,
    Search,
    Logo,
    WebPlayer,
    Breadcrumb
]).name;

export default commonModule;