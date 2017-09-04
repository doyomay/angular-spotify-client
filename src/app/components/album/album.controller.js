class AlbumCtrl {
    constructor($scope, $stateParams, $q, SpotifyFactory, WebPlayerFactory, locker) {
        $scope.query = $stateParams.albumId;
        $scope.data = {};
        $scope.tracks = [];
        $scope.discs = [];
        $scope.reproducir = (track) => {
            WebPlayerFactory.setAudio(Object.assign({}, track, {album: $scope.data}))
        };
        $scope.favoriteSong = track => {
            if (locker.has(track.id)) {
                locker.forget(track.id);
            } else {
                locker.put(track.id, Object.assign({}, track, {album: $scope.data}));
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
            $scope.discs = AlbumCtrl.generateDiscs($scope.tracks);
            const TOTAL_TRACKS = response.data.tracks.total;
            const LIMIT_TRACKS = 50;
            if (TOTAL_TRACKS > LIMIT_TRACKS) {
                let urls = AlbumCtrl.generatePromiseUrls($scope.query, TOTAL_TRACKS, LIMIT_TRACKS, SpotifyFactory);
                $q.all(urls).then(data => {
                    data.map(response => {
                        tracksFlag = $scope.tracks;
                        $scope.tracks = tracksFlag.concat(response.data.items);
                        $scope.discs = AlbumCtrl.generateDiscs($scope.tracks);
                    });
                });
            }
        });
        $scope.inFavoriteSongs = (track) => {
            return locker.has(track.id)
        }

        $scope.order = null;
        $scope.orders = [null, '+duration_ms', '-duration_ms'];
        $scope.postionOrder = 0;
        $scope.orderBy = () => {
            $scope.postionOrder++;
            $scope.postionOrder = $scope.postionOrder >= $scope.orders.length ? 0 : $scope.postionOrder;
            $scope.order = $scope.orders[$scope.postionOrder];
        }

    }

    static generatePromiseUrls(albumId, total, limit, SpotifyFactory) {
        const TOTAL_URLS = Math.ceil(total / limit);
        let urls = [];
        for (let i = 1; i < TOTAL_URLS; i++) {
            urls.push(SpotifyFactory.getNextUrl(`https://api.spotify.com/v1/albums/4oSQj7yRl9NzXqPSihwT38/tracks?offset=${(i * limit)}&limit=${limit}`));
        }
        return urls;
    }

    static generateDiscs(tracks) {
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