import Route from '@ember/routing/route';
import AnimationAwareMixin from 'silo-test/mixins/animation-aware';
import StackableRoute from 'silo-test/mixins/stackable-route';

export default Route.extend(AnimationAwareMixin, StackableRoute, {
});
