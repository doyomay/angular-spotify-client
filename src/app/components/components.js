import angular from 'angular';
import Home from './home/home';
import FavoriteSongs from './favorite-songs/favorite-songs';
import searchResult from './search-result/search-result';
import Artist from './artista/artista';
import Album from './album/album';

let componentModule = angular.module('app.components', [
    Home,
    FavoriteSongs,
    searchResult,
    Artist,
    Album
]).name;

export default componentModule;