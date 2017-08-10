import './style.scss';

class SearchResultListCtrl {
    constructor($scope, $location, $http) {
        $scope.songs = [];
        $scope.nombre = "Este es un nombre";
        var searchObject = $location.search();
        $scope.query = searchObject.q;
        $http.get('https://api.spotify.com/v1/search?q=' + $scope.query + '&type=artist', {
            headers: {
                'Authorization': 'Bearer BQD60LCJSNhK3QTEIpG9S3xf9HOxjRx0cblOKNo3Dk_8fFaYeW_mdEXsIL-GqaHqvvm8Njt3pgFeIcD16ZCgb_ksRONDV6EIC5hzUGirI5jwpAZmJiyzTtBWd6k2YL9demEGIaeMXVBs3rQ'
            },
        }).then((response) => {
            $scope.songs = response.data.artists.items;
            console.log($scope.songs);
        }, (response) => { console.log(response) });
    }
}

export default SearchResultListCtrl;