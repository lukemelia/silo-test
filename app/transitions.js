import { get } from '@ember/object';

export default function(){

  // loading directly
  this.transition(
    this.fromRoute(null),
    this.toRoute('page'),
    this.onInitialRender(),
    this.use('cutToSilo', 1),
    this.debug()
  );

  // slide when drilling down or tapping Back
  ['schedule-item'].forEach((routeName) => {
    this.transition(
      this.toRoute(routeName),
      // this.fromModel(function(page, pageChild) {
      //   return get(pageChild, 'page') === page;
      // }),
      this.use('slideToSilo', 2),
      this.reverse('slideToSilo', 1)
    );

    // cut when switching page while on a pageChild
    this.transition(
      this.toRoute(routeName),
      this.fromModel(function(page, pageChild) {
        return get(pageChild, 'page') !== page;
      }),
      this.use('cutToSilo', 2),
      this.reverse('cutToSilo', 1)
    );

    // loading directly
    this.transition(
      this.fromRoute(null),
      this.toRoute(routeName),
      this.onInitialRender(),
      this.use('cutToSilo', 2),
      this.reverse('cutToSilo', 1),
      this.debug()
    );

    // this.transition(
    //   this.hasClass('title-bar-outlet'),
    //   this.fromRoute('page.title-bar'),
    //   this.toRoute(`${routeName}.title-bar`),
    //   this.use('slideTitle', 'left'),
    //   this.reverse('slideTitle', 'right'),
    //   this.fromModel(function(page, pageChild) {
    //     return pageChild.get('page') === page;
    //   })
    // );
  });
}
