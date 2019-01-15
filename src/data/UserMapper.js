import config from '../config.js';
import { get, post, put, del } from './crud';

class UserMapper {

    create = (user) => {
        return post(config.restUrl + "users", user);
    }

    authenticate = (email, password) => {
        return post(config.restUrl + "authentication/user", { email, password });
    }

    getUser(id) {
        return get(config.restUrl + "users/" + id);
    }
}

export default UserMapper;