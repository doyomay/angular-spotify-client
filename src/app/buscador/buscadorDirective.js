import './style.scss';
let searchDirective = () => {
    return {
        template: require('./index.html'),
        controller: 'SearchCtrl'
    }
};
export default searchDirective;