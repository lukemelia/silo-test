import Ember from 'ember';

export default Ember.Component.extend({
  layer: null, // PT.number.isRequired
  item: null, // component ref
  titleBar: null, // component ref
  service: Ember.inject.service('nav-stacks'),
  tagName: '',
  willRender() {
    this.get('service').pushItem(
      Ember.guidFor(this),
      this.get('layer'),
      this.get('item'),
      this.get('titleBar')
    );
  },
  willDestroyElement() {
    this.get('service').removeItem(Ember.guidFor(this));
  }
});
