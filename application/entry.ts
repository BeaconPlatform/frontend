export * from './modules';
import {dependencies} from './dependencies';
import {default as bootstrap} from './bootstrap';
import {default as run} from './run';

export const application: angular.IModule   = angular.module(
  'Beacon',
  dependencies
);

// Bootstrap the application.
bootstrap(application).then((): void => {
  // Run the application.
  run(application);
});
