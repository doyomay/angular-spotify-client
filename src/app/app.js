import angular from 'angular';
import ngRoute from 'angular-route';
import '../style/normalize.css';
import SearchCtrl from './buscador';
import searchDirective from './buscador/buscadorDirective';
import FavoriteSongsCtrl from './favoriteSongs';
import favoriteSongsDirective from './favoriteSongs/favoriteSongsDirective';

import SearchResultListCtrl from './searchResult';
import ArtistaCtrl from './artista';
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
    let methods = {};
    let url = "https://api.spotify.com/v1/";
    $http.defaults.headers.common.Authorization = 'Bearer BQBml3TA9EJUR4bhnmn8IeIKihqu_YH-zIQxgFpeKrznFd5GBk-Tpx6IWEfJ39VdKkyv3QuTrVQC7ibmp7sRsW1B49SoYGZGfeKNMKl-742FKyP5r6-LiEDNtO0EZj8LGskQf5wok987PTA';
    methods = {
        search: function(query) {
            return $http.get(url + 'search?q=' + query + '&type=artist');
        },
        getArtist: function(idArtist) {
            return $http.get(url + 'artists/' + idArtist);
        },
        getAlbumsArtist: function(idArtist) {
            return $http.get(url + 'artists/' + idArtist + '/albums');
        },
    };
    return methods;
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute'])
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
            });
    }])
    .factory('SpotifyFactory', SpotifyFactory)
    .directive('app', app)
    .directive('appSearch', searchDirective)
    .directive('appFavoriteSongs', favoriteSongsDirective)
    .controller('AppCtrl', AppCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .controller('SearchResultCtrl', SearchResultListCtrl)
    .controller('FavoriteSongsCtrl', FavoriteSongsCtrl)
    .controller('ArtistaCtrl', ArtistaCtrl);

export default MODULE_NAME;