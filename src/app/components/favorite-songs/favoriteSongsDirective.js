import './style.scss';
let favoriteSongsDirective = () => {
    return {
        template: require('./index.html'),
        controller: 'FavoriteSongsCtrl'
    }
};
export default favoriteSongsDirective;