class SearchCtrl {
    constructor($scope) {
        $scope.artista = "";
        $scope.buscador = () => {
            console.log($scope.artista);
        }
    }
}

export default SearchCtrl;