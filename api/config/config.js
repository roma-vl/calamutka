import development from './development.js';
import production from './production.js';

let config;
if (process.env.NODE_ENV === 'development') {
    config = development;
}
if (process.env.NODE_ENV === 'production') {
    config = production;
} else {
    config = development
}
export default config
