import slideToSilo from './slide-to-silo';
import { childRoute } from "liquid-fire/ember-internals";

export default function(toSiloIndex, opts = {}) {
  let newRoute = childRoute(this.newValue);
  return routeModel(childRoute(versionValue(conditions, 1), conditions.matchContext.outletName));
  opts = Object.assign({}, opts);
  opts.duration = 0;
  return slideToSilo.call(this, toSiloIndex, opts);
}

function versionValue(conditions, index) {
  let versions = conditions.versions;
  return versions[index] ? versions[index].value : null;
}
