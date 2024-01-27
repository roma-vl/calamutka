import 'dotenv/config'
import development from './development.js';

let config;
if (process.env.NODE_ENV === 'development') {
    config = development;
} else {
    config = development
}
export default config
