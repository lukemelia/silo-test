import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  layerIndex: 0,
  siloIndex: computed(function() {
    let parentRoute = this.router.getParentRoute(this);
    let parentRouteSiloIndex = parentRoute.get('siloIndex');
    if (parentRouteSiloIndex) {
      return parentRouteSiloIndex + 1;
    }
  }),
  renderTemplate() {
    this.render(this.templateName || this.routeName, {
      into: 'yapp',
      outlet: `layer-${this.get('layerIndex')}-silo-${this.get('siloIndex')}`
    });
  }
});
