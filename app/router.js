import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  getParentRoute(route) {
    let routerMicroLib = this._routerMicrolib;
    let { handlerInfos } = routerMicroLib.state;
    if (!handlerInfos) {
      return;
    }
    let routes = handlerInfos.mapBy('_handler');
    let routeIndex = routes.indexOf(route);
    if (routeIndex > 0) {
      return routes[routes.indexOf(route) - 1];
    }
  }
});

function myScheduleRoutes(dsl) {
  dsl.route('my-schedule', { resetNamespace: true }, function() {
    this.route('schedule-item', { path: '/schedule-items/:schedule_item_id' }, function() {
      this.route('rating-form');
      this.route('document', { path: '/documents/:document_id' });
    });
  });
}

Router.map(function() {
  this.route('yapp', { path: '/yapp/', resetNamespace: true }, function() {
    this.route('more'); // layer 0, silo 0
    this.route('page', { path: '/pages/:page_id', resetNamespace: true }, function() { // layer 0, silo 1
      this.route('main', { path: '/' }, function() {
        myScheduleRoutes(this);
      });
      this.route('schedule-item', { path: '/schedule-items/:schedule_item_id', resetNamespace: true }, function() {  // layer 0, silo 2
        this.route('rating-form');  // layer 0, silo 3
        this.route('person');  // layer 1, silo 0
          myScheduleRoutes(this);
      });
      this.route('track', { path: '/tracks/:track_id', resetNamespace: true }, function() { // track_id is "all" or UUID   // layer 1, silo 2
        this.route('schedule-item', { path: '/schedule-items/:schedule_item_id' }, function() {   // layer 0, silo 3
          this.route('rating-form');   // layer 0, silo 4
          this.route('person');  // layer 1, silo 0
          myScheduleRoutes(this);
        });
        myScheduleRoutes(this);
      });
    });
  });
});

export default Router;
