class WebPlayerCtrl {
    constructor($scope, $interval, WebPlayerFactory) {
        $scope.cancion = '';
        $scope.artista = '';
        $scope.album_image = '';
        $scope.duration = {
            init: 0,
            end: 30000
        };
        const progressAudio = document.getElementById("webPlayer_progress");
        const progressVolumen = document.getElementById("webPlayer_volumen");
        const WP = WebPlayerFactory.getAudioPlayer();
        $scope.currentVolumen = WP.volume;
        //WP.addEventListener('play', () => {});
        //WP.addEventListener('progress', () => { console.log('Pos avanzo') })
        WP.addEventListener('emptied', () => {
            let track = WebPlayerFactory.getTrackInfo();
            progressAudio.value = 0;
            //progressAudio.max = track.duration_ms * 0.001;
            $scope.duration = {
                init: 0,
                end: 30000
            };
            $scope.$apply(() => {
                $scope.cancion = track.name;
                $scope.artista = track.artists[0].name;
                $scope.album_image = track.album.images[2].url
            });
            $interval(() => {
                $scope.duration = {
                    init: Math.ceil(WP.currentTime * 1000),
                    end: 30000
                };
                progressAudio.value = WP.currentTime;
            }, 1);
        })
        WP.addEventListener('ended', () => { console.log('Pos termino') })
        WP.addEventListener('volumechange', () => {
            progressVolumen.value = WP.volume;
        })

        $scope.play = () => {
            WebPlayerFactory.play()
        }
        $scope.pause = () => {
            WebPlayerFactory.pause()
        }
        $scope.mute = () => {
            WP.muted = !WP.muted;
        }
        $scope.volumenDown = () => {
            if (WP.volume > 0.1)
                WP.volume -= .1;
        }
        $scope.volumenUp = () => {
            if (WP.volume < 1)
                WP.volume += .1;
        }
    }
}

export default WebPlayerCtrl;