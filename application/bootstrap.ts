import * as Q from 'q';
import {routes} from './routes';

export default (application: angular.IModule): Q.IPromise<void> => {
  var deferred: Q.Deferred<any>   = Q.defer();
  configure(application);
  deferred.resolve(undefined);
  return deferred.promise;
};

/**
 * Configure Angular.
 *
 * @param   {angular.IModule}    application
 */
function configure(application: angular.IModule): void {
  application.config(
    [
      '$httpProvider',
      '$locationProvider',
      '$urlRouterProvider',
      'stateHelperProvider',
      (
        $httpProvider: angular.IHttpProvider,
        $locationProvider: angular.ILocationProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $stateHelperProvider: angular.ui.IStateProvider
      ): void => {
        $locationProvider.html5Mode(true);

        routes.map(
          (route: angular.ui.IState): void => {
            $stateHelperProvider.state(route);
          }
        );

        $urlRouterProvider.otherwise(function($injector: any): void {
          var $state: angular.ui.IStateService    = $injector.get('$state');

          $state.go('beacon.home');
        });
      }
    ]
  );
}
