/**
 * Runtime cycle.
 *
 * @param   {angular.IModule}   application
 */
export default (application: angular.IModule): void => {
  application.run([
    (): void => {
      //
    }
  ]);

  angular.bootstrap(document, [application.name]);
};
