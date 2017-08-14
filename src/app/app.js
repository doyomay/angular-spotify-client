import angular from 'angular';
import 'angular-tooltips';
import ngRoute from 'angular-route';

//Styles
import '../style/normalize.css';
import '../style/app.scss';

//Directives
import logoDirective from './logo';
import breadcrumbDirective from './breadcrumb/breadcrumbDirective';
import searchDirective from './buscador/buscadorDirective';
import favoriteSongsDirective from './favoriteSongs/favoriteSongsDirective';

//Controllers
import FavoriteSongsCtrl from './favoriteSongs';
import SearchCtrl from './buscador';
import SearchResultListCtrl from './searchResult';
import ArtistaCtrl from './artista';
import AlbumCtrl from './album';

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
    $http.defaults.headers.common.Authorization = 'Bearer BQBR3LL24ShtCjRkuxAfD6x1quYNbV7vpvXYVgG4eDJ1SXDrkmH8adDypRZJ_gm6iD0nsgKS3c0qXmy9RQuohwP-wmjLKz9lF-621ipsYTd8e_goztrO_V50BpGt3rQCLTi8UhUR77_GgEw';
    return {
        search: function(query) {
            return $http.get(url + 'search?q=' + query + '&type=artist');
        },
        getArtist: function(idArtist) {
            return $http.get(url + 'artists/' + idArtist);
        },
        getAlbumsArtist: function(idArtist) {
            return $http.get(url + 'artists/' + idArtist + '/albums');
        },
        getTracksAlbum: function(idAlbum) {
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
    .directive('breadcrumb', breadcrumbDirective)
    .directive('appLogo', logoDirective)
    .directive('appSearch', searchDirective)
    .directive('appFavoriteSongs', favoriteSongsDirective)
    .controller('AppCtrl', AppCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .controller('SearchResultCtrl', SearchResultListCtrl)
    .controller('FavoriteSongsCtrl', FavoriteSongsCtrl)
    .controller('ArtistaCtrl', ArtistaCtrl)
    .controller('AlbumCtrl', AlbumCtrl);

export default MODULE_NAME;