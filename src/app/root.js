export class Root {
    configureRouter(config, router) {
        config.title = 'Cerberus';
        config.map([
            { route: ['', 'home'], name: 'home', moduleId: './home/list', nav: true, title: 'Home' },
            { route: 'script/:name', name: 'script', moduleId: './script/scriptDetail', nav: false, title: 'Script' }
        ]);

        this.router = router;
    }
}
