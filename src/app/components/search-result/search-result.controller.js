class SearchResultListCtrl {
    constructor($scope, $rootScope, $location, SpotifyFactory, ScrollInfiniteService) {
        $scope.songs = [];
        $scope.nombre = "Este es un nombre";
        $scope.placeholder = "prueba";
        $scope.next = null;
        let searchObject = $location.search();
        $scope.query = searchObject.q;
        let spotifyLessPromise = SpotifyFactory.search($scope.query);
        spotifyLessPromise.then(response => {
            SearchResultListCtrl.addResult($scope, response, ScrollInfiniteService);
        });

        $rootScope.$on('WINDOW_BOTTOM', () => {
            ScrollInfiniteService.stopEvent();
            if ($scope.next !== null) {
                SpotifyFactory.getNextUrl($scope.next).then((response) => {
                    SearchResultListCtrl.addResult($scope, response, ScrollInfiniteService)
                });
            }
        });
    }

    static addResult($scope, response, ScrollInfiniteService) {
        ScrollInfiniteService.initEvent();
        $scope.songs = $scope.songs.concat(response.data.artists.items);
        $scope.next = response.data.artists.next;
    }
}

export default SearchResultListCtrl;