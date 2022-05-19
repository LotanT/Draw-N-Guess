import { utils } from './utils.service';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

export const userService = {
  setUser,
  logout,
  getLoggedinUser,
  updatUser,
};

async function setUser() {
  let user = { _id: null, game: null };
  user._id = utils.getRandomId();
  return _saveLocalUser(user);
}

async function updatUser(user) {
    return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  );
}
