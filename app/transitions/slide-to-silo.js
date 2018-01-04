import { Promise as EmberPromise } from 'rsvp';
import Ember from 'ember';
import { animate } from 'liquid-fire';

export default function(offset = 0, opts = {}) {
  let siloIndex;
  if (this.newValue) {
    siloIndex = this.newValue.c.args.named.siloIndex.value();
  } else if (this.oldValue) {
    siloIndex = this.oldValue.c.args.named.siloIndex.value();
  }
  siloIndex = siloIndex + offset;

  // entering level siloIndex
  let siloContainer = this.newElement.closest('.silo-container');
  let currentSiloIndex = this.newElement.data('current-index') || 0;
  if (currentSiloIndex > siloIndex) {
    if (this.oldElement) {
      // TODO check if we're interrupting a 'sliding-silo-container' animation
      let left = siloIndex * -100;
      let params = {
        left: `${left}px`
      };

      this.newElement.css({ visibility: '' });
      return animate(siloContainer, params, opts, 'sliding-silo-container').finally(() => {
        siloContainer.data('current-index', siloIndex);
      });
    }
  } else {
    if (this.newElement) {
      this.newElement.css({ visibility: '' });
      if (this.oldElement) {
        this.oldElement.css({ visibility: 'hidden' });
      }

      // check if we're interrupting a 'sliding-silo-container' animation
      let currentlyAnimatingSiloIndex = siloContainer.data('is-animating-silo-index');
      if (currentlyAnimatingSiloIndex > siloIndex) {
        Ember.Logger.debug('suppressing silo animation because a higher-level one is running');
        return;
      }
      siloContainer.data('is-animating-silo-index', siloIndex);
      //// NOTE: This is used by .y-list-item, .y-more-list-item, .y-bordered-list-item and other row-types to apply the highlight (.active class) when tapping on the row
      // let $listItem = siloContainer.find(`div[data-list-item-id=${this.newValue.outlets.main.render.controller.model.id}]`);
      // $listItem.addClass('active');
      let left = siloIndex * -100;
      let params = {
        left: `${left}px`
      };

      return animate(siloContainer, params, opts, 'sliding-silo-container').finally(function() {
        // $listItem.removeClass('active');
        siloContainer.data('is-animating-silo-index', null);
        siloContainer.data('current-index', siloIndex);
      });
    }
  }
  return EmberPromise.resolve();
}
