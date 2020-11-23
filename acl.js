const _ = require("lodash");

module.exports = class User {
  constructor() {
    this.permissions = [];
  }
  setPermissions(input) {
    this.permissions.push(input);
  }
  havePermissions(input) {
    for (const item of this.permissions) {
      if (item.resource === input.resource) {
        if (_.isEqual(item.roles, input.roles)) return true;
      }
    }
    return false;
  }
};
