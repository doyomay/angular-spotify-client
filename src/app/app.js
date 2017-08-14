import angular from 'angular';
import 'angular-tooltips';
import ngRoute from 'angular-route';
import '../style/normalize.css';
import SearchCtrl from './buscador';
import searchDirective from './buscador/buscadorDirective';
import FavoriteSongsCtrl from './favoriteSongs';
import favoriteSongsDirective from './favoriteSongs/favoriteSongsDirective';

import SearchResultListCtrl from './searchResult';
import ArtistaCtrl from './artista';
import AlbumCtrl from './album';
import '../style/app.scss';

let app = () => {
    return {
        template: require('./app.html'),
        controller: 'AppCtrl',
        controllerAs: 'app'
    }
};


class AppCtrl {
    constructor($scope) {
        $scope.nombre = "";
        $scope.hey = () => {
            alert($scope.nombre);
        }
    }
}

let SpotifyFactory = ($http) => {
    let url = "https://api.spotify.com/v1/";
    $http.defaults.headers.common.Authorization = 'Bearer BQDfJWd_z3N83VyJq1wbOeTJJZjTvoS-32Sx_5nepRdz-YpUtGlFFbdMVRK3DHeU_gGQCLNR27Eh6j8REPy9FudKihqtGOz-b262fM2R16hz2zzOmE7fYjcGYsQ00I8VWIqbKWj6KXTmTj0';
    return {
        search: function (query) {
            return $http.get(url + 'search?q=' + query + '&type=artist');
        },
        getArtist: function (idArtist) {
            return $http.get(url + 'artists/' + idArtist);
        },
        getAlbumsArtist: function (idArtist) {
            return $http.get(url + 'artists/' + idArtist + '/albums');
        },
        getTracksAlbum: function (idAlbum) {
            return $http.get(url + 'albums/' + idAlbum);
        },
    };
};

let WebPlayerFactory = () => {
    const AUDIO_PLAYER = document.getElementById('webPlayer');
    return {
        setAudio: (src) => {
            AUDIO_PLAYER.pause();
            AUDIO_PLAYER.autoplay = true;
            AUDIO_PLAYER.src = src;
            AUDIO_PLAYER.load();
        }
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute', '720kb.tooltips'])
    .config(["$routeProvider", "$locationProvider", ($routeProvider, $locationProvider) => {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/", {
                controller: 'AppCtrl',
                template: require('./app.html'),
            })
            .when("/search", {
                controller: 'SearchResultCtrl',
                template: require('./searchResult/index.html'),
            })
            .when("/artist/:artistId", {
                template: require('./artista/index.html'),
                controller: 'ArtistaCtrl',
            })
            .when("/album/:albumId", {
                template: require('./album/index.html'),
                controller: 'AlbumCtrl',
            });
    }])
    .factory('SpotifyFactory', SpotifyFactory)
    .factory('WebPlayerFactory', WebPlayerFactory)
    .directive('app', app)
    .directive('appSearch', searchDirective)
    .directive('appFavoriteSongs', favoriteSongsDirective)
    .controller('AppCtrl', AppCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .controller('SearchResultCtrl', SearchResultListCtrl)
    .controller('FavoriteSongsCtrl', FavoriteSongsCtrl)
    .controller('ArtistaCtrl', ArtistaCtrl)
    .controller('AlbumCtrl', AlbumCtrl);

export default MODULE_NAME;