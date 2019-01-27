const routes = require('next-routes')();

routes
.add('/charities/new', '/charities/new')
.add('/charities/:address', '/charities/view')
.add('/charities/:address/requests', '/charities/requests/index')
.add('/charities/:address/requests/new', '/charities/requests/new');


module.exports = routes;
