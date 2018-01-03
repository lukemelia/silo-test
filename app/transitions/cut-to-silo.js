import slideToSilo from './slide-to-silo';

export default function(toSiloIndex, opts = {}) {
  opts = Object.assign({}, opts);
  opts.duration = 0;
  return slideToSilo.call(this, toSiloIndex, opts);
}
