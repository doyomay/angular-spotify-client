import './style.scss';

class SearchResultListCtrl {
    constructor($scope, $location, $http) {
        $scope.songs = [];
        $scope.nombre = "Este es un nombre";
        $scope.placeholder = "prueba";
        var searchObject = $location.search();
        $scope.query = searchObject.q;
        $http.get('https://api.spotify.com/v1/search?q=' + $scope.query + '&type=artist', {
            headers: {
                'Authorization': 'Bearer BQDjrqTpXqb-PeV7mVce9CwMc-hgLVuWCaWubGv23yBcAFLzAT8e_xwd8OGYcpJpknN_R9bRTwoQzPb7JGCR-8uJ9Qvu5Cqc3hgp2JRE_1-W83LCZZgavJ4qS3JZKMkHJaVE4OVyvdEf7Mg'
            },
        }).then((response) => {
            $scope.songs = response.data.artists.items;
            console.log($scope.songs);
        }, (response) => { console.log(response) });
    }
}

export default SearchResultListCtrl;