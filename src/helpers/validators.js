class Validator {
  static validateRegisterUserInfo(userInfo) {
    if (
      userInfo.hasOwnProperty("name") &&
      userInfo.hasOwnProperty("email") &&
      userInfo.hasOwnProperty("password") &&
      userInfo.hasOwnProperty("role")
    ) {
      return { status: true, message: "User info validate successfully" };
    } else {
      return { status: false, message: "User info is malformed" };
    }
  }

  static validateAuthUserInfo(authInfo) {
    if (
      authInfo.hasOwnProperty("email") &&
      authInfo.hasOwnProperty("password")
    ) {
      return { status: true, message: "Auth User info validate successfully" };
    } else {
      return { status: false, message: "Auth User info is malformed" };
    }
  }
}

module.exports = Validator;
