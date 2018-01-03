import Route from '@ember/routing/route';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';
import RenderTitleBar from 'silo-test/mixins/render-title-bar';

export default Route.extend(LiquidSiloRoute, RenderTitleBar);
