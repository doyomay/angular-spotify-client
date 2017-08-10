class SearchCtrl {
    constructor($scope) {
        $scope.artista = "";
        $scope.placeholder = 'Sarch for your favorite artist here';
        $scope.buscador = () => {
            console.log($scope.artista);
        }
    }
}

export default SearchCtrl;