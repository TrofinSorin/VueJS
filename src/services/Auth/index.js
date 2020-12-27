import Cookies from "js-cookie";
import update from "immutability-helper";

const Auth = {
  isAuthenticated: false,
  guestInfo: {},
  user: {},
  authenticate(user) {
    if (!user) {
      return;
    }

    Cookies.set("accessToken", user ? user.accessToken : null, {
      expires: process.env.VUE_APP_COOKIES_EXPIRATION.expiration,
      domain: process.env.VUE_APP_DOMAIN_URL,
    });
    Cookies.set("username", user ? user.username : null, {
      expires: process.env.VUE_APP_COOKIES_EXPIRATION.expiration,
      domain: process.env.VUE_APP_DOMAIN_URL,
    });
    Cookies.set("id", user ? user.id : null, {
      expires: process.env.VUE_APP_COOKIES_EXPIRATION.expiration,
      domain: process.env.VUE_APP_DOMAIN_URL,
    });
    Cookies.set("role", user ? user.role : null, {
      expires: process.env.VUE_APP_COOKIES_EXPIRATION.expiration,
      domain: process.env.VUE_APP_DOMAIN_URL,
    });

    this.isAuthenticated = true;
    this.user = user;
  },
  getUserToken() {
    return Cookies.get("userToken");
  },
  getUserId() {
    return Cookies.get("id");
  },
  generateUserToken(token) {
    Cookies.set("userToken", token ? token : null, {
      expires: process.env.VUE_APP_COOKIES_EXPIRATION.expiration,
      domain: process.env.VUE_APP_DOMAIN_URL,
    });
  },
  authenticated() {
    return Cookies.get("accessToken");
  },
  init() {
    const accessToken = Cookies.get("accessToken");
    const username = Cookies.get("username");
    const id = Cookies.get("id");
    const role = Cookies.get("role");

    if (accessToken && username && id && role) {
      this.authenticate({
        role,
        accessToken,
        username,
        id,
      });
    }
  },
  update(data) {
    if (!data) {
      return;
    }

    this.user = update(this.user, {
      $merge: {
        dateCreated: data.dateCreated,
        dateUpdated: data.dateUpdated,
        email: data.email,
        id: data.id,
        lastLogin: data.lastLogin,
        phone: data.phone,
        role: data.role || Cookies.get("role") ? data.role : null,
      },
    });
  },
  guestAuthenticate(guestInfo) {
    this.isAuthenticated = true;
    this.guestInfo = guestInfo;
  },
  setUserAddress(address) {
    this.guestInfo = { address: address };
  },
  signout() {
    this.isAuthenticated = false;
    this.reset();
    this.user = {};
  },
  signoutGuestAuth() {
    this.isAuthenticated = false;
    this.guestInfo = {};
  },
  getUser() {
    return {
      ...this.user,
    };
  },
  getGuestAuth() {
    return {
      ...this.guestInfo,
    };
  },
  reset() {
    Object.keys(this.user).forEach((el) => {
      Cookies.remove(el, { domain: process.env.VUE_APP_DOMAIN_URL });
    });

    Cookies.remove("address", { domain: process.env.VUE_APP_DOMAIN_URL });
    Cookies.remove("isGps", { domain: process.env.VUE_APP_DOMAIN_URL });
  },
};

export default Auth;
