import {IndexController} from './common/controllers/index_controller';
import {HomeController} from './common/controllers/home_controller';

var commonModule: angular.IModule   = angular.module(
  'Beacon.common',
  []
);

commonModule.controller('IndexController', IndexController);
commonModule.controller('HomeController', HomeController);

