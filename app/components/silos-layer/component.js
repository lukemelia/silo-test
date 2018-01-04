import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { get } from '@ember/object';

export default Component.extend({
  layout,
  classNames: ['layer-container', 'viewport'],
  classNameBindings: ['layerIndexCssClass', 'hasTabBar'],
  layerIndexCssClass: computed('layerIndex', function() {
    return `layer-${this.get('layerIndex')}`;
  }),
  titleBarTransitionRules,
  siloTransitionRules
});

function titleBarTransitionRules() {
  this.transition(
    this.use('slideTitle', 'left'),
    this.reverse('slideTitle', 'right'),
    this.toValue(function(newValue, oldValue) {
      let newSiloIndex = newValue.c.args.named.siloIndex.value();
      let oldSiloIndex = oldValue.c.args.named.siloIndex.value();
      // let newRootPage = newValue.args.named.rootPage.value();
      // let oldRootPage = oldValue.args.named.rootPage.value();
      return newSiloIndex > oldSiloIndex;
    })
  );
}

function siloTransitionRules() {
  this.transition(
    this.toValue(function(newValue) {
      return !!newValue.c && newValue.c.name !== 'more-contents';
    }),
    this.onInitialRender(),
    this.use('cutToSilo'),
  );
  this.transition(
    this.toValue(function(newValue) {
      return !!newValue.c && newValue.c.name !== 'more-contents';
    }),
    this.use('slideToSilo')
  );
  this.transition(
    this.toValue(function(newValue, oldValue) {
      if (!newValue.c || !oldValue.c) {
        return false;
      }
      if (newValue.c.name === 'more-contents') {
        return false;
      }
      let newRootPage = newValue.c.args.named.rootPage.value();
      let oldRootPage = oldValue.c.args.named.rootPage.value();
      // console.log('newRootPage', newRootPage, 'oldRootPage', oldRootPage);
      return newRootPage && oldRootPage && get(newRootPage, 'id') !== get(oldRootPage, 'id');
    }),
    this.use('cutToSilo')
  );
  this.transition(
    this.toValue(function(newValue) {
      if (newValue.c.name === 'more-contents') {
        return false;
      }
      return !newValue.c;
    }),
    this.use('slideToSilo', -1)
  );
}
