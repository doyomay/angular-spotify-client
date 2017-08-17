class ArtistaCtrl {
    constructor($scope, $routeParams, SpotifyFactory) {
        $scope.query = $routeParams.artistId;
        $scope.songs = [];
        $scope.artist = {
            name: "",
            name: "",
            images: [],
            genres: [],
            albums: []
        };
        let spotifyLessPromise = SpotifyFactory.getArtist($scope.query);
        spotifyLessPromise.then((response) => {
            $scope.artist = response.data;
        });
        let spotifyAlbumsLessPromise = SpotifyFactory.getAlbumsArtist($scope.query);
        spotifyAlbumsLessPromise.then((response) => {
            $scope.artist.albums = response.data.items;
            $scope.songs = $scope.artist.albums;
        })
    }
}

export default ArtistaCtrl;