import Mixin from '@ember/object/mixin';
export default Mixin.create({
  renderTemplate() {
    this._super(...arguments);
    let templateName = this.templateName || this.routeName;
    let titleBar = `${templateName.replace(/\./g, '/')  }/title-bar`;
    this.render(titleBar, {
      into: 'yapp',
      outlet: `layer-${this.get('layerIndex')}-title-bar`
    });
  }
});
