import "./style.scss";
class FavoriteSongsCtrl {
    constructor($scope, locker, WebPlayerFactory) {
        $scope.reproducir = (track) => { WebPlayerFactory.setAudio(track) };
        $scope.removeTrack = (track) => {
            locker.forget(track.id);
            this.init($scope, locker);
        };
        this.init($scope, locker);
    }
    init($scope, locker) {
        let favoriteSongs = locker.all();
        $scope.favoriteSongs = Object.values(locker.all());
        $scope.songs = $scope.favoriteSongs;
    }

}

export default FavoriteSongsCtrl;