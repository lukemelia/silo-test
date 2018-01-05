import Route from '@ember/routing/route';
import $ from 'jquery';
import config from 'silo-test/config/environment';

export default Route.extend({
  beforeModel() {
    if (config.BIRDS_EYE_DEBUGGING) {
      $('body').addClass('birds-eye-debugging');
    }
  }
});
