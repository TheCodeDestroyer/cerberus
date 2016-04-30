export class Root {
    configureRouter(config, router) {
        config.title = 'Cerberus';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './home/list', nav: false, title: 'Home' },
            { route: 'script/:id', name: 'script', moduleId: './script/scriptDetail', nav: false, title: 'Script' }
        ]);

        this.router = router;
    }
}
