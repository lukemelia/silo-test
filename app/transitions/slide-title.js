import { Promise, animate } from 'liquid-fire';

export default function(direction, opts = {}) {
  let distanceOut = this.newElement.width() / 8;
  let distanceIn = distanceOut;
  if (direction === 'left') {
    distanceOut *= -1;
  } else {
    distanceIn *= -1;
  }
  return Promise.all([
    animate(this.oldElement, {
      opacity: 0,
      translateX: [`${distanceOut}px`]
    }, opts),
    animate(this.newElement, {
      opacity: 1,
      translateX: ['0px', `${distanceIn}px`]
    }, opts)
  ]);
}
