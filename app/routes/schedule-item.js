import Route from '@ember/routing/route';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';
import AnimationAwareMixin from 'silo-test/mixins/animation-aware';

export default Route.extend(AnimationAwareMixin, LiquidSiloRoute, {
  model(params = {}) {
    let page = this.modelFor('page');
    return {
      slug: params.schedule_item_id,
      page
    };
  },
  actions: {
    back() {
      if (this.isRunningTransitions()) {
        return;
      }
      this.transitionTo('page');
    },
    visitMySchedule() {
      console.log('TODO');
    },
    drillDownToRatingForm() {
      this.transitionTo('schedule-item.rating-form');
    }
  }
});
