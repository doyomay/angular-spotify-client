let SpotifyFactory = ($http, $rootScope, authService) => {
    let url = "https://api.spotify.com/v1/";
    let TOKEN = authService.getAccessToken();
    let MARKET = authService.getUserCountry();
    $rootScope.$on('TOKEN_UPDATE', () => {
        TOKEN = authService.getAccessToken();
        MARKET = authService.getUserCountry();
        $http.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
    });
    $http.defaults.headers.common.Authorization = `Bearer ${TOKEN}`;
    $http.defaults.transformResponse.push((data, headersGetter, status) => {
        if (401 === status) {
            $rootScope.$broadcast('AUTH_UNAUTHORIZED');
        }
        return data;
    });
    return {
        getUser: () => {
            return $http.get(`${url}me`);
        },
        search: query => {
            return $http.get(`${url}search?q=${query}&type=artist&market=${MARKET}`);
        },
        getArtist: idArtist => {
            return $http.get(`${url}artists/${idArtist}?market=${MARKET}`);
        },
        getAlbumsArtist: idArtist => {
            return $http.get(`${url}artists/${idArtist}/albums?market=${MARKET}`);
        },
        getTracksAlbum: idAlbum => {
            return $http.get(`${url}albums/${idAlbum}?market=${MARKET}`);
        },
        getNextUrl: _url => {
            return $http.get(_url);
        }
    };
};

export default SpotifyFactory;