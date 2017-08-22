import './style.scss';
class AlbumCtrl {
    constructor($scope, $routeParams, $q, SpotifyFactory, WebPlayerFactory, locker) {
        $scope.query = $routeParams.albumId;
        $scope.data = {};
        $scope.tracks = [];
        $scope.discs = [];
        $scope.reproducir = (track) => { WebPlayerFactory.setAudio(Object.assign({}, track, { album: $scope.data })) };
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
            $scope.data = response.data;
            let tracksFlag = $scope.tracks;
            $scope.tracks = tracksFlag.concat(response.data.tracks.items);
            $scope.discs = this.generateDiscs($scope.tracks);

            const TOTAL_TRACKS = response.data.tracks.total;
            const LIMIT_TRACKS = 50;
            if (TOTAL_TRACKS > LIMIT_TRACKS) {
                let deferred = $q.defer();
                let urls = this.generatePromiseUrls($scope.query, TOTAL_TRACKS, LIMIT_TRACKS, SpotifyFactory);
                $q.all(urls).then(data => {
                    data.map(response => {
                        tracksFlag = $scope.tracks;
                        $scope.tracks = tracksFlag.concat(response.data.items);
                        $scope.discs = this.generateDiscs($scope.tracks);
                    });
                });
            }
        });
        $scope.inFavoriteSongs = (track) => {
            return locker.has(track.id)
        }
    }

    generatePromiseUrls(albumId, total, limit, SpotifyFactory) {
        const TOTAL_URLS = Math.ceil(total / limit);
        let urls = [];
        for (let i = 1; i < TOTAL_URLS; i++) {
            urls.push(SpotifyFactory.getNextUrl(`https://api.spotify.com/v1/albums/4oSQj7yRl9NzXqPSihwT38/tracks?offset=${(i*limit)}&limit=${limit}`));
        }
        return urls;
    }
    generateDiscs(tracks) {
        let flag = 1;
        let discContainer = [];
        for (let i = 0; i < tracks.length; i++) {
            if (!discContainer[tracks[i].disc_number - 1])
                discContainer[tracks[i].disc_number - 1] = [];
            discContainer[tracks[i].disc_number - 1].push(tracks[i]);
        }
        return discContainer;
    }
}

export default AlbumCtrl;