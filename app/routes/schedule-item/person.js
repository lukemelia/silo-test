import Route from '@ember/routing/route';
import StackableRoute from 'silo-test/mixins/stackable-route';
import AnimationAwareMixin from 'silo-test/mixins/animation-aware';

export default Route.extend(StackableRoute, AnimationAwareMixin, {
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
