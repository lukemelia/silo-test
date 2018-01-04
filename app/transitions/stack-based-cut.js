import { Promise as EmberPromise } from 'rsvp';
import { animate } from 'liquid-fire';

export default function(opts = {}) {
  let stackPosition;
  let stackDepth;
  if (!this.newValue) {
    //TODO: do something here?
    return EmberPromise.resolve();
  }
  if (this.newValue) {
    stackPosition = this.newValue.index;
    stackDepth = this.newValue.stackDepth;
  }
  let params = {
    translateX: `${(stackDepth - 1 - stackPosition)*-100}px`
  };
  opts.duration = 0;
  if (this.oldElement) {
    this.oldElement.css('visibility', 'hidden');
  }
  let siloElement = this.newElement.closest('.silo-outlet');
  this.newElement.css('visibility', 'visible');
  console.log("CUT ", siloElement, " silo to ", params);
  return animate(this.newElement.closest('.silo-outlet'), params, opts, 'stack-based-cut');
}
