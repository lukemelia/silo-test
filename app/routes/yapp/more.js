import Route from '@ember/routing/route';
import AnimationAwareMixin from 'silo-test/mixins/animation-aware';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';

export default Route.extend(AnimationAwareMixin, LiquidSiloRoute, {
  siloIndex: 0
});
