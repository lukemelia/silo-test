import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  layerIndex: 0,
  getRouteComponent(/* model */) {
    return `routable-components/${(this.templateName || this.routeName).replace(/\./g,'/')}`;
  },
  getTitleBarComponent(model) {
    return `${this.getRouteComponent(model)}/title-bar`;
  },
  siloIndex: computed(function() {
    let parentRoute = this.router.getParentRoute(this);
    let parentRouteSiloIndex = parentRoute.get('siloIndex');
    if (parentRouteSiloIndex) {
      return parentRouteSiloIndex + 1;
    }
  }),
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      siloIndex: this.get('siloIndex'),
      layerIndex: this.get('layerIndex'),
      routeComponent: this.getRouteComponent(model),
      titleBarComponent: this.getTitleBarComponent(model)
    });
  }
});
