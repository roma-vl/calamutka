import config from './config/config.js';

// console.log(config)
import initApp from'./server.js'
initApp()
    .then((server) => {
        // server.modules.callInitModules();
        const port = process.env.PORT || 4000;
        server.server.listen(port, () =>
            console.log(`Server running on port ${port}, http://localhost:${port}`)
        );

    })

    .catch((err) => {
        console.log(err);
    });

