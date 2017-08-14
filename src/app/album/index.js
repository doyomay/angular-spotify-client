import './style.scss';
class AlbumCtrl {
    constructor($scope, $routeParams, SpotifyFactory, WebPlayerFactory, locker) {
        $scope.query = $routeParams.albumId;
        $scope.data = {};
        $scope.tracks = [];
        $scope.reproducir = (track) => { WebPlayerFactory.setAudio(track.preview_url) };
        $scope.favoriteSong = track => {
            if (locker.has(track.id)) {
                locker.forget(track.id);
            } else {
                locker.put(track.id, Object.assign({}, track, { album: $scope.data }));
            }
        }
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