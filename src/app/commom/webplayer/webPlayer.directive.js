import './style.scss';

let webPlayerDirective = {
    restrict: 'E',
    template: require('./template.html'),
    controller: 'webPlayerCtrl',
    scope: {
        data: '='
    }
};
export default webPlayerDirective;