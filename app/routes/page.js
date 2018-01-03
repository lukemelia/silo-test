import Route from '@ember/routing/route';
import LiquidSiloRoute from 'silo-test/mixins/liquid-silo-route';
import RenderTitleBar from 'silo-test/mixins/render-title-bar';

export default Route.extend(LiquidSiloRoute, RenderTitleBar, {
  siloIndex: 1,
  model(params = {}) {
    return {
      pageTitle: params.page_id,
      slug: params.page_id
    };
  }
});
