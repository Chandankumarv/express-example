const env = process.env.NODE_ENV || 'development';
import Development from './development.json';
import Production from './production.json';
import Test from './test.json';

class Config {
    static getConfigFile() {
        switch (env) {
            case 'development':
                return Development;
            case 'production':
                return Production;
            case 'test':
                return Test;
            default:
                return Development;
        }
    }
}
export const config = Config.getConfigFile();