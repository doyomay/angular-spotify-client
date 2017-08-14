import "./style.scss";
class FavoriteSongsCtrl {
    constructor($scope, locker, WebPlayerFactory) {
        $scope.reproducir = (track) => { WebPlayerFactory.setAudio(track.preview_url) };
        let favoriteSongs = locker.all();
        console.log(favoriteSongs);
        $scope.favoriteSongs = Object.values(locker.all());
        $scope.songs = $scope.favoriteSongs;
        $scope.auch = () => {
            console.log('auch');
        }
    }

}

export default FavoriteSongsCtrl;