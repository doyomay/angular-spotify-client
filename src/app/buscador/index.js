class SearchCtrl {
    constructor($scope, $location) {
        $scope.artista = "";
        $scope.placeholder = 'Search for your favorite artist here';
        $scope.buscador = () => {
            $location.path('/search').search({ q: $scope.artista });
        }
    }
}

export default SearchCtrl;