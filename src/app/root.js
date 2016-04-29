export class Root {
    configureRouter(config, router) {
        config.title = 'Cerberus';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './home/list', nav: true, title: 'Home' }
        ]);

        this.router = router;
    }
}
