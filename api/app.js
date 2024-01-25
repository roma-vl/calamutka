const config = require('config');
const initApp = require('./server');
initApp()
    .then((server) => {
        // server.modules.callInitModules();
        const port = process.env.PORT || 4000;
        server.app.listen(port, () =>
            console.log(`Server running on port ${port}, http://localhost:${port}`)
        );
    })

    .catch((err) => {
        console.log(err);
    });

