import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Component.extend({
  layer: null, // PT.number.isRequired
  navStacksService: service('nav-stacks'),
  layout,
  classNames: ['layer-container', 'viewport'],
  classNameBindings: ['layerIndexCssClass', 'hasTabBar'],
  layerIndexCssClass: computed('layer', function() {
    return `layer-${this.get('layer')}`;
  }),
  titleBarComponent: computed.readOnly('stackItems.lastObject.titleBarComponent'),
  stackItems: computed('layer', 'navStacksService.stacks', function(){
    return this.get(`navStacksService.stacks.layer${this.get('layer')}`);
  }),
  components: computed.mapBy('stackItems', 'component'),
  titleBarTransitionRules,
  stackItemTransitionRules
});

function titleBarHasSameRootPage(newValue, oldValue) {
  let newRootPageReference = newValue.titleBar && newValue.titleBar.args.named.rootPage;
  let oldRootPageReference = oldValue.titleBar && oldValue.titleBar.args.named.rootPage;
  return newRootPageReference && oldRootPageReference && get(newRootPageReference.value(), 'id') === get(oldRootPageReference.value(), 'id');
}

function stackItemHasSameRootPage(newValue, oldValue) {
  let newRootPageReference = newValue.item && newValue.item.args.named.rootPage;
  let oldRootPageReference = oldValue.item && oldValue.item.args.named.rootPage;
  return newRootPageReference && oldRootPageReference && get(newRootPageReference.value(), 'id') === get(oldRootPageReference.value(), 'id');
}

function titleBarTransitionRules() {
  this.transition(
    this.use('slideTitle', 'left'),
    this.toValue(function(newValue, oldValue) {
      return titleBarHasSameRootPage(newValue, oldValue) && newValue.stackDepth > oldValue.stackDepth;
    })
  );
  this.transition(
    this.use('slideTitle', 'right'),
    this.toValue(function(newValue, oldValue) {
      return titleBarHasSameRootPage(newValue, oldValue) && newValue.stackDepth < oldValue.stackDepth;
    })
  );
}

function stackItemTransitionRules() {
  const SLIDE_EASING = 'easeInOutQuint';
  const SLIDE_DURATION = 450;

  this.setDefault({
    duration: SLIDE_DURATION,
    easing: SLIDE_EASING
  });

  this.transition(
    this.onInitialRender(),
    this.use('stackBasedCut')
  );
  this.transition(
    this.toValue(function(newValue, oldValue) {
      return !stackItemHasSameRootPage(newValue, oldValue);
    }),
    this.use('stackBasedCut')
  );
  this.transition(
    this.toValue(function(newValue, oldValue) {
      return stackItemHasSameRootPage(newValue, oldValue) && newValue.stackDepth !== oldValue.stackDepth;
    }),
    this.use('stackBasedSlide')
  );

  // this.transition(
  //   this.toValue(function(newValue) {
  //     return !!newValue.c && newValue.c.name !== 'more-contents';
  //   }),
  //   this.onInitialRender(),
  //   this.use('cutToSilo'),
  // );
  // this.transition(
  //   this.toValue(function(newValue) {
  //     return !!newValue.c && newValue.c.name !== 'more-contents';
  //   }),
  //   this.use('slideToSilo')
  // );
  // this.transition(
  //   this.toValue(function(newValue, oldValue) {
  //     if (!newValue.c || !oldValue.c) {
  //       return false;
  //     }
  //     if (newValue.c.name === 'more-contents') {
  //       return false;
  //     }
  //     let newRootPage = newValue.c.args.named.rootPage.value();
  //     let oldRootPage = oldValue.c.args.named.rootPage.value();
  //     // console.log('newRootPage', newRootPage, 'oldRootPage', oldRootPage);
  //     return newRootPage && oldRootPage && get(newRootPage, 'id') !== get(oldRootPage, 'id');
  //   }),
  //   this.use('cutToSilo')
  // );
  // this.transition(
  //   this.toValue(function(newValue) {
  //     if (newValue.c.name === 'more-contents') {
  //       return false;
  //     }
  //     return !newValue.c;
  //   }),
  //   this.use('slideToSilo', -1)
  // );
}
