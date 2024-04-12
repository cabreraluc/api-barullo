const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const { MODULES, ROLES } = require("./modulesAndRoles");

// >>>>>>>>>>>>>>> OPERADOR USDT --------------------------------------------------------------------------------------------------------

ac.grant(ROLES.ADMIN)

  ////////////////

  // READ
  .readAny(MODULES.get_clients)
  .readAny(MODULES.get_activities)
  .readAny(MODULES.get_clients_paginate)
  .readAny(MODULES.get_client_by_id)
  .readAny(MODULES.get_activity_by_id)
  .readAny(MODULES.get_user_by_id)
  .readAny(MODULES.get_users)
  .readAny(MODULES.get_events)
  .readAny(MODULES.get_artists)
  .readAny(MODULES.get_artist_by_id)
  .readAny(MODULES.get_prospect_by_id)
  .readAny(MODULES.get_event_by_id)
  .readAny(MODULES.get_prospects)
  .readAny(MODULES.get_prospects_paginate)
  .readAny(MODULES.get_activities_by_day)

  // CREATE
  .createAny(MODULES.register_client)
  .createAny(MODULES.register_prospect)
  .createAny(MODULES.register_artist)
  .createAny(MODULES.register_user)
  .createAny(MODULES.register_event)
  .createAny(MODULES.register_activity)

  // UPDATE
  .updateAny(MODULES.edit_artist)
  .updateAny(MODULES.edit_event)
  .updateAny(MODULES.edit_client)
  .updateAny(MODULES.edit_activity)
  .updateAny(MODULES.edit_prospect)
  .updateAny(MODULES.edit_user)
  .updateAny(MODULES.change_prospect_status)
  .updateAny(MODULES.change_interest_level)

  // DELETE
  .deleteAny(MODULES.disable_client)
  .deleteAny(MODULES.disable_prospect)
  .deleteAny(MODULES.disable_user)
  .deleteAny(MODULES.archive_activity)
  .deleteAny(MODULES.disable_artist)
  .deleteAny(MODULES.disable_event)

  // >>>>>>>>>>>>>>> OPERADOR RECAUDADOR ------------------------------------------------------------------------------------------------

  .grant(ROLES.MEMBER)

  // READ
  .readAny(MODULES.get_clients)
  .readAny(MODULES.get_clients_paginate)
  .readAny(MODULES.get_client_by_id)
  .readAny(MODULES.get_users)
  .readAny(MODULES.get_prospect_by_id)
  .readAny(MODULES.get_prospects)
  .readAny(MODULES.get_prospects_paginate)
  .readAny(MODULES.get_user_by_id)
  // CREATE
  .createAny(MODULES.register_client)
  .createAny(MODULES.register_prospect)

  // UPDATE
  .updateAny(MODULES.edit_client)
  .updateAny(MODULES.edit_prospect)
  .updateAny(MODULES.change_prospect_status)
  .updateAny(MODULES.change_interest_level)
  // DELETE
  .deleteAny(MODULES.disable_client)
  .deleteAny(MODULES.disable_prospect);

// >>>>>>>>>>>>>>> LIQUIDADOR CAJA ------------------------------------------------------------------------------------------------

module.exports = {
  ac,
  ROLES,
  MODULES,
};
