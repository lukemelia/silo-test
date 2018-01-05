import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { animate } from 'liquid-fire';
import { observer } from '@ember/object';
const SLIDE_EASING = 'easeInOutQuint';
const SLIDE_DURATION = 450;

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
  stackDepth: computed.readOnly('stackItems.length'),
  components: computed.mapBy('stackItems', 'component'),
  titleBarTransitionRules,
  didInsertElement(){
    this._super(...arguments);
    scheduleOnce('afterRender', this, this.handleStackDepthChange, true);
  },
  stackDepthChanged: observer('stackItems', function() {
    this.handleStackDepthChange();
  }),
  handleStackDepthChange(initialRender = false) {
    let stackDepth = this.get('stackItems.length') || 0;
    let rootComponentRef = this.get('stackItems.firstObject.component');
    let rootComponentIdentifier = getComponentIdentifier(rootComponentRef);
    let titleBarAnimation = 'cut';

    let layer = this.get('layer');
    if (initialRender) {
      this.scheduleCut();
    }
    else if (layer > 0 && stackDepth > 0 && this._stackDepth === 0) {
      this.scheduleSlideUp();
    }
    else if (layer > 0 && stackDepth === 0 && this._stackDepth > 0) {
      this.scheduleSlideDown();
    }
    else if (stackDepth === 1 && rootComponentIdentifier !== this._rootComponentIdentifier) {
      this.scheduleCut();
    } else if (stackDepth < this._stackDepth) {
      this.scheduleSlideBack();
      titleBarAnimation = 'slideBack';
    } else if (stackDepth > this._stackDepth) {
      this.scheduleSlideForward();
      titleBarAnimation = 'slideForward';
    }
    this.setTitleBarInfo(titleBarAnimation);
    this._stackDepth = stackDepth;
    this._rootComponentIdentifier = rootComponentIdentifier;
  },
  setTitleBarInfo(enterAnimation = 'cut') {
    this.set('titleBarInfo', {
      component: this.get('stackItems.lastObject.titleBarComponent'),
      enterAnimation
    });
  },
  scheduleCut() {
    scheduleOnce('afterRender', this, this.cut);
  },
  scheduleSlideBack() {
    this.cloneLastStackItem();
    scheduleOnce('afterRender', this, this.slideBack);
  },
  scheduleSlideForward() {
    scheduleOnce('afterRender', this, this.slideForward);
  },
  scheduleSlideDown() {
    this.cloneLastStackItem();
    scheduleOnce('afterRender', this, this.slideDown);
  },
  scheduleSlideUp() {
    scheduleOnce('afterRender', this, this.slideUp);
  },
  cut() {
    let stackDepth = this.get('stackDepth');
    let layer = this.get('layer');
    let layerX = (stackDepth - 1) * -100;
    this.$('.silo-container').css('left', layerX);
    if (layer > 0 & stackDepth > 0) {
      this.$().css('top', 0);
    }
  },
  slideForward() {
    let stackDepth = this.get('stackDepth');
    let layerX = (stackDepth - 1) * -100;
    let params = {
      left: layerX
    };
    animate(
      this.$('.silo-container'),
      params,
      { duration: SLIDE_DURATION, easing: SLIDE_EASING },
      'layer-slide'
    );
  },
  slideBack() {
    let stackDepth = this.get('stackDepth');
    let layerX = (stackDepth - 1) * -100;
    let params = {
      left: layerX
    };
    animate(
      this.$('.silo-container'),
      params,
      { duration: SLIDE_DURATION, easing: SLIDE_EASING },
      'layer-slide'
    ).finally(() => {
      if (this.clonedStackItem) {
        this.clonedStackItem.remove();
        this.clonedStackItem = null;
      }
    });
  },
  slideUp() {
    let params = {
      top: [0, 200]
    };
    animate(
      this.$(),
      params,
      { duration: SLIDE_DURATION, easing: SLIDE_EASING },
      'layer-slide'
    );
  },
  slideDown() {
    let params = {
      top: 200
    };
    animate(
      this.$(),
      params,
      { duration: SLIDE_DURATION, easing: SLIDE_EASING },
      'layer-slide'
    ).finally(() => {
      if (this.clonedStackItem) {
        this.clonedStackItem.remove();
        this.clonedStackItem = null;
      }
    });
  },

  cloneLastStackItem() {
    let clone = this.clonedStackItem = this.$('.silo-outlet:last-child').clone();
    clone.attr('id', `${this.elementId}_clonedStackItem`);
    this.attachClone(clone);
  },
  attachClone(clone) {
    this.$('.silo-container').append(clone);
  }
});

function titleBarTransitionRules() {
  this.transition(
    this.use('slideTitle', 'left'),
    this.toValue(function(newValue) {
      return newValue.enterAnimation === 'slideForward';
    })
  );

  this.transition(
    this.use('slideTitle', 'right'),
    this.toValue(function(newValue) {
      return newValue.enterAnimation === 'slideBack';
    })
  );
}

function getComponentIdentifier(componentRef) {
  if (!componentRef) {
    return 'none';
  }
  let result = componentRef.name;
  if (componentRef.args.named.model) {
    result += `:${get(componentRef.args.named.model.value(), 'id')}`;
  }
  return result;
}
