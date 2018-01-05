import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  templateName: 'stackable',
  getRouteComponent(/* model */) {
    return `routable-components/${(this.routableTemplateName || this.routeName).replace(/\./g,'/')}`;
  },
  getTitleBarComponent(model) {
    return `${this.getRouteComponent(model)}/title-bar`;
  },
  layerIndex: computed(function() {
    let parentRoute = this.router.getParentRoute(this);
    let parentRoutelayerIndex = parentRoute.get('layerIndex');
    return parentRoutelayerIndex || 0;
  }),
  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      layerIndex: this.get('layerIndex'),
      routeComponent: this.getRouteComponent(model),
      titleBarComponent: this.getTitleBarComponent(model)
    });
  }
});
