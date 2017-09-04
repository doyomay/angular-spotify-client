let WebPlayerFactory = () => {
    const AUDIO_PLAYER = document.getElementById('webPlayer');
    let TRACK = null;
    return {
        setAudio: (song) => {
            TRACK = song;
            AUDIO_PLAYER.pause();
            AUDIO_PLAYER.autoplay = true;
            AUDIO_PLAYER.src = song.preview_url;
            AUDIO_PLAYER.load();
        },
        getTrackInfo: () => {
            return TRACK;
        },
        getAudioPlayer: () => {
            return AUDIO_PLAYER;
        },
        pause: () => {
            AUDIO_PLAYER.pause();
        },
        play: () => {
            AUDIO_PLAYER.play();
        }
    }
};

export default WebPlayerFactory;