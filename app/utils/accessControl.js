const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const { MODULES, ROLES } = require("./modulesAndRoles");

// >>>>>>>>>>>>>>> OPERADOR USDT --------------------------------------------------------------------------------------------------------

ac.grant(ROLES.ADMIN)

  ////////////////

  // READ
  .readAny(MODULES.get_user_by_id)
  .readAny(MODULES.get_users)
  .readAny(MODULES.get_events)
  .readAny(MODULES.get_artists)
  .readAny(MODULES.get_artist_by_id)
  .readAny(MODULES.get_event_by_id)

  // CREATE

  .createAny(MODULES.register_artist)
  .createAny(MODULES.register_user)
  .createAny(MODULES.register_event)

  // UPDATE
  .updateAny(MODULES.edit_artist)
  .updateAny(MODULES.edit_event)
  .updateAny(MODULES.edit_user)
  .updateAny(MODULES.disable_or_active_artist)

  // DELETE
  .deleteAny(MODULES.disable_user)
  .deleteAny(MODULES.disable_event)

  .grant(ROLES.MEMBER)

  // READ
  .readAny(MODULES.get_users)
  .readAny(MODULES.get_user_by_id);

module.exports = {
  ac,
  ROLES,
  MODULES,
};
