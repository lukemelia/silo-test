import Controller from '@ember/controller';

export default Controller.extend({
  titleBarTransitionRules,
  silo1TransitionRules: siloTransitionRules(1),
  silo2TransitionRules: siloTransitionRules(2),
  silo3TransitionRules: siloTransitionRules(3),
  silo4TransitionRules: siloTransitionRules(4)
});

function titleBarTransitionRules() {
  this.transition(
    this.use('slideTitle', 'left'),
    this.reverse('slideTitle', 'right'),
    this.toValue(function(newValue, oldValue) {
      let newSiloIndex = newValue.args.named.siloIndex.value();
      let oldSiloIndex = oldValue.args.named.siloIndex.value();
      return newSiloIndex > oldSiloIndex;
    })
  );
}

function siloTransitionRules(siloIndex) {
  return function() {
    this.transition(
      this.toValue(function(newValue) {
        return !!newValue;
      }),
      this.onInitialRender(),
      this.use('cutToSilo', siloIndex),
    );
    this.transition(
      this.toValue(function(newValue) {
        return !!newValue;
      }),
      this.use('slideToSilo', siloIndex)
    );
    this.transition(
      this.toValue(function(newValue) {
        return !newValue;
      }),
      this.use('slideToSilo', siloIndex - 1)
    );
  };
}
