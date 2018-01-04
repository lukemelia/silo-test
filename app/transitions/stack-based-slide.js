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
  let endPosition = (stackDepth - 1 - stackPosition)*-100;
  let startPosition = this.oldValue ? endPosition : endPosition + 100;
  let params = {
    translateX: [endPosition, startPosition]
  };
  // if (this.oldElement) {
  //   this.oldElement.css('visibility', 'hidden');
  // }
  let siloElement = this.newElement.closest('.silo-outlet');
  this.newElement.css('visibility', 'visible');
  console.log("SLIDE ", siloElement, " silo to ", params);
  return animate(siloElement, params, opts, 'stack-based-cut');
}
