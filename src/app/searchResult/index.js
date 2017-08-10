import './style.scss';

class SearchResultListCtrl {
    constructor($scope, $location, SpotifyFactory) {
        $scope.songs = [];
        $scope.nombre = "Este es un nombre";
        $scope.placeholder = "prueba";
        var searchObject = $location.search();
        $scope.query = searchObject.q;
        let spotifyLessPromise = SpotifyFactory.search($scope.query);
        spotifyLessPromise.then((response) => {
            $scope.songs = response.data.artists.items;
        })
    }
}

export default SearchResultListCtrl;