class ArtistaCtrl {
    constructor($scope, $routeParams, $rootScope, ScrollInfiniteService, SpotifyFactory) {
        $scope.query = $routeParams.artistId;
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
        ScrollInfiniteService.detectBottom();
        let spotifyLessPromise = SpotifyFactory.getArtist($scope.query);
        spotifyLessPromise.then((response) => {
            $scope.artist = response.data;
        });
        let spotifyAlbumsLessPromise = SpotifyFactory.getAlbumsArtist($scope.query);
        spotifyAlbumsLessPromise.then((response) => {
            this.addAlbums($scope, response);
        })
        $rootScope.$on('WINDOW_BOTTOM', () => {
            if ($scope.next != null) {
                SpotifyFactory.getNextUrl($scope.next).then((response) => {
                    this.addAlbums($scope, response)
                });
            }
        });
    }
    addAlbums($scope, response) {
        $scope.pages++;
        $scope.albums = $scope.albums.concat(response.data.items);
        $scope.songs = $scope.albums;
        $scope.next = response.data.next;
    }
}

export default ArtistaCtrl;