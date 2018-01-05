import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  templateName: 'stackable',
  getRouteComponent(/* model */) {
    return `routable-components/${(this.routableTemplateName || this.routeName).replace(/\./g,'/')}`;
  },
  getHeaderComponent(model) {
    return `${this.getRouteComponent(model)}/title-bar`;
  },
  layerIndex: computed(function() {
    let parentRoute = this.router.getParentRoute(this);
    let parentRouteLayerIndex = parentRoute.get('layerIndex');
    return parentRouteLayerIndex || 0;
  }),
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      layerIndex: this.get('layerIndex'),
      routeComponent: this.getRouteComponent(model),
      headerComponent: this.getHeaderComponent(model)
    });
  }
});
