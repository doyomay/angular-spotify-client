import angular from 'angular';
import 'angular-tooltips';
import ngRoute from 'angular-route';
import 'angular-locker';

//Styles
import '../style/normalize.css';
import '../style/app.scss';

//Directives
import logoDirective from './logo';
import breadcrumbDirective from './breadcrumb/breadcrumbDirective';
import searchDirective from './buscador/buscadorDirective';
import webPlayerDirective from './webPlayer/webPlayerDirective';
import favoriteSongsDirective from './favoriteSongs/favoriteSongsDirective';

//Controllers
import FavoriteSongsCtrl from './favoriteSongs';
import SearchCtrl from './buscador';
import WebPlayerCtrl from './webPlayer';
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

//Providers

let SpotifyFactory = ($http) => {
    let url = "https://api.spotify.com/v1/";
    $http.defaults.headers.common.Authorization = 'Bearer BQDTKN6s9eMOG2MXKjAXSuuRexqpY0nuUfDRHnvHLqgnl7g9Ra-EUpVBQis0oNqU5hki-sd6k7pFMcu6rZ3WHPkmRja3Y0hOQMlHAgRtG5b0ZfE_sKip8E0kxuEYy53uvM1vXNtbEuk-sFI';
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
        getNextUrl: function(_url) {
            return $http.get(_url);
        }
    };
};

let WebPlayerFactory = () => {
    const AUDIO_PLAYER = document.getElementById('webPlayer');
    let TRACK = null;
    return {
        setAudio: (song) => {
            TRACK = song;
            AUDIO_PLAYER.pause();
            AUDIO_PLAYER.autoplay = true;
            AUDIO_PLAYER.src = song.preview_url;
            AUDIO_PLAYER.load();
        },
        getTrackInfo: () => {
            return TRACK;
        },
        getAudioPlayer: () => {
            return AUDIO_PLAYER;
        },
        pause: () => {
            AUDIO_PLAYER.pause();
        },
        play: () => {
            AUDIO_PLAYER.play();
        }
    }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngRoute', '720kb.tooltips', 'angular-locker'])
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
    .filter('millSecondsToTimeString', function() {
        return function(millseconds) {
            let oneSecond = 1000;
            let oneMinute = oneSecond * 60;
            let oneHour = oneMinute * 60;
            let oneDay = oneHour * 24;

            let seconds = Math.floor((millseconds % oneMinute) / oneSecond);
            let minutes = Math.floor((millseconds % oneHour) / oneMinute);
            let hours = Math.floor((millseconds % oneDay) / oneHour);
            let days = Math.floor(millseconds / oneDay);

            let timeString = '';
            // if (days !== 0) {
            //     timeString += (days !== 1) ? (days + ' days ') : (days + ' day ');
            // }
            // if (hours !== 0) {
            //     timeString += (hours !== 1) ? (hours + ' hours ') : (hours + ' hour ');
            // }
            if (minutes !== 0) {
                timeString += minutes
            } else {
                timeString += '00';
            }
            if (seconds !== 0 || millseconds < 1000) {
                timeString += ':' + (seconds < 10 ? '0' + seconds : seconds);
            }

            return timeString;
        };
    })
    .factory('SpotifyFactory', SpotifyFactory)
    .factory('WebPlayerFactory', WebPlayerFactory)
    .directive('app', app)
    .directive('breadcrumb', breadcrumbDirective)
    .directive('appLogo', logoDirective)
    .directive('appSearch', searchDirective)
    .directive('appFavoriteSongs', favoriteSongsDirective)
    .directive('webPlayer', webPlayerDirective)
    .controller('AppCtrl', AppCtrl)
    .controller('webPlayerCtrl', WebPlayerCtrl)
    .controller('SearchCtrl', SearchCtrl)
    .controller('SearchResultCtrl', SearchResultListCtrl)
    .controller('FavoriteSongsCtrl', FavoriteSongsCtrl)
    .controller('ArtistaCtrl', ArtistaCtrl)
    .controller('AlbumCtrl', AlbumCtrl);

export default MODULE_NAME;