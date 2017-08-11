import './style.scss';
class AlbumCtrl {
    constructor($scope, $routeParams, SpotifyFactory, WebPlayerFactory) {
        $scope.query = $routeParams.albumId;
        $scope.data = {};
        $scope.tracks = [];
        $scope.reproducir = (track) => { WebPlayerFactory.setAudio(track.preview_url) };
        $scope.artist = {
            name: "",
            name: "",
            images: [],
            genres: [],
            albums: []
        };
        let spotifyTrasksLessPromise = SpotifyFactory.getTracksAlbum($scope.query);
        spotifyTrasksLessPromise.then((response) => {
            console.log(response);
            $scope.data = response.data;
            $scope.tracks = $scope.data.tracks;
            console.log($scope.tracks);
        })

    }
}

export default AlbumCtrl;