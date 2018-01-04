import Route from '@ember/routing/route';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';

export default Route.extend(LiquidSiloRoute, {
  siloIndex: 1,
  model(params = {}) {
    return {
      pageTitle: params.page_id,
      slug: 'schedule2',
      id: params.page_id,
      isUnderMorePage: params.page_id > 2
    };
  },
  actions: {
    drillDownToScheduleItem(scheduleItem) {
      this.transitionTo('schedule-item', scheduleItem);
    },
    visitMySchedule() {
      console.log('TODO');
    },
    backToMorePage() {
      this.transitionTo('yapp.more');
    }
  }
});
