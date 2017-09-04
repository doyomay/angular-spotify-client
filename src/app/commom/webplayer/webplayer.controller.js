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
        WP.addEventListener('progress', () => {
            console.log('Pos avanzo')
        });
        WP.addEventListener('emptied', () => {
            let track = WebPlayerFactory.getTrackInfo();
            progressAudio.value = 0;
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
        WP.addEventListener('ended', () => {
            console.log('Pos termino')
        })
        WP.addEventListener('volumechange', () => {
            progressVolumen.value = WP.volume;
        });

        let listener = () => {
            window.requestAnimationFrame(() => {
                WP.currentTime = progressAudio.value;
                $scope.duration = {
                    init: progressAudio.value,
                    end: 30000
                };
            });
        };

        function addListenerMulti(el, s, fn) {
            s.split(' ').forEach(e => el.addEventListener(e, fn, false));
        }

        function rmListenerMulti(el, s, fn) {
            s.split(' ').forEach(e => el.removeEventListener(e, fn, false));
        }

        addListenerMulti(progressAudio, 'mousedown ontouchstart', () => {
            listener();
            addListenerMulti(progressAudio, 'mousemove ontouchmove', listener);
        })

        addListenerMulti(progressAudio, 'mouseup ontouchend', () => {
            rmListenerMulti(progressAudio, 'mousemove ontouchmove', listener);
        })

        let listenerVolumen = () => {
            window.requestAnimationFrame(() => {
                WP.volume = progressVolumen.value;
            });
        };

        progressVolumen.addEventListener("mousedown", () => {
            listenerVolumen();
            progressVolumen.addEventListener("mousemove", listenerVolumen);
        });

        progressVolumen.addEventListener("mouseup", () => {
            progressVolumen.removeEventListener("mousemove", listenerVolumen);
        });

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