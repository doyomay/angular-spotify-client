import angular from 'angular';
import MiliSeconds from './formatMiliseconds/formatmiliseconds';

let filtersModule = angular.module('app.filters', [
    MiliSeconds,
]).name;

export default filtersModule;