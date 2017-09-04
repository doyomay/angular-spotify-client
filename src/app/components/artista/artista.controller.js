class ArtistaCtrl {
    constructor($scope, $stateParams, $rootScope, ScrollInfiniteService, SpotifyFactory) {
        $scope.query = $stateParams.artistId;
        $scope.songs = [];
        $scope.artist = {
            name: "",
            name: "",
            images: [],
            genres: []
        };
        $scope.albums = [];
        $scope.pages = 0;
        $scope.next = null;
        let spotifyLessPromise = SpotifyFactory.getArtist($scope.query);
        spotifyLessPromise.then((response) => {
            $scope.artist = response.data;
        });
        let spotifyAlbumsLessPromise = SpotifyFactory.getAlbumsArtist($scope.query);
        spotifyAlbumsLessPromise.then((response) => {
            ArtistaCtrl.addAlbums($scope, response, ScrollInfiniteService);
        });
        $rootScope.$on('WINDOW_BOTTOM', () => {
            ScrollInfiniteService.stopEvent();
            if ($scope.next !== null) {
                SpotifyFactory.getNextUrl($scope.next).then((response) => {
                    ArtistaCtrl.addAlbums($scope, response, ScrollInfiniteService)
                });
            }
        });
    }

    static addAlbums($scope, response, ScrollInfiniteService) {
        $scope.pages++;
        $scope.albums = $scope.albums.concat(response.data.items);
        $scope.songs = $scope.albums;
        $scope.next = response.data.next;
        ScrollInfiniteService.initEvent();
    }
}

export default ArtistaCtrl;