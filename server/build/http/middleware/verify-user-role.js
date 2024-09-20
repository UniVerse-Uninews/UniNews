"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/middleware/verify-user-role.ts
var verify_user_role_exports = {};
__export(verify_user_role_exports, {
  verifyUserRole: () => verifyUserRole
});
module.exports = __toCommonJS(verify_user_role_exports);
function verifyUserRole(roleToVerify) {
  return async (request, reply) => {
    console.log("Request user:", request.user);
    console.log("Role to verify:", roleToVerify);
    if (!request.user || !request.user.role) {
      console.error("User or role not available:", request.user);
      reply.status(401).send({ message: "Unauthorized" });
      return;
    }
    const { role } = request.user;
    if (role !== roleToVerify) {
      console.error("Role mismatch. Expected:", roleToVerify, "Actual:", role);
      reply.status(403).send({ message: "Forbidden" });
      return;
    }
    console.log("Role authorized:", role);
    return;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyUserRole
});
