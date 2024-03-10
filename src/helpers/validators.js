class Validator {
  static validateRegisterUserInfo(userInfo) {
    if (
      userInfo.hasOwnProperty("name") &&
      userInfo.hasOwnProperty("email") &&
      userInfo.hasOwnProperty("password") &&
      userInfo.hasOwnProperty("role")
    ) {
      return { status: true, message: "User info validated successfully" };
    } else {
      return { status: false, message: "User info is malformed" };
    }
  }

  static validateAuthUserInfo(authInfo) {
    if (
      authInfo.hasOwnProperty("email") &&
      authInfo.hasOwnProperty("password")
    ) {
      return { status: true, message: "Auth User info validated successfully" };
    } else {
      return { status: false, message: "Auth User info is malformed" };
    }
  }

  static validateEventInfo(eventInfo) {
    if (
      eventInfo.hasOwnProperty("name") &&
      eventInfo.hasOwnProperty("description") &&
      eventInfo.hasOwnProperty("eventDate")
    ) {
      return { status: true, message: "Event info validated successfully" };
    } else {
      return { status: false, message: "Event info is malformed" };
    }
  }
}

module.exports = Validator;
