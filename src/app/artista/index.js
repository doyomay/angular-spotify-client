class ArtistaCtrl {
    constructor($scope, $routeParams, SpotifyFactory) {
        $scope.query = $routeParams.artistId;
        $scope.artist = {
            name: "",
            name: "",
            images: []
        };
        let spotifyLessPromise = SpotifyFactory.getArtist($scope.query);
        spotifyLessPromise.then((response) => {
            $scope.artist = response.data;
            console.log($scope.artist);
        })
    }
}

export default ArtistaCtrl;