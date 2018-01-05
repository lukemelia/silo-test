import Route from '@ember/routing/route';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';
import AnimationAwareMixin from 'silo-test/mixins/animation-aware';

export default Route.extend(LiquidSiloRoute, AnimationAwareMixin, {
  layerIndex: 1,
  actions: {
    close() {
      if (this.isRunningTransitions()) {
        return;
      }
      this.transitionTo('schedule-item');
    },
  }
});
