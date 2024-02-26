const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const { MODULES, ROLES } = require("./modulesAndRoles");

// >>>>>>>>>>>>>>> OPERADOR USDT --------------------------------------------------------------------------------------------------------

ac.grant(ROLES.ADMIN)

  // READ
  .readAny(MODULES.get_clients)
  .readAny(MODULES.get_clients_paginate)
  .readAny(MODULES.get_client_by_id)
  .readAny(MODULES.get_user_by_id)
  .readAny(MODULES.get_users)
  .readAny(MODULES.get_prospect_by_id)
  .readAny(MODULES.get_prospects)
  .readAny(MODULES.get_prospects_paginate)

  // CREATE
  .createAny(MODULES.register_client)
  .createAny(MODULES.register_prospect)
  .createAny(MODULES.register_user)

  // UPDATE
  .updateAny(MODULES.edit_client)
  .updateAny(MODULES.edit_prospect)
  .updateAny(MODULES.edit_user)

  // DELETE
  .deleteAny(MODULES.disable_client)
  .deleteAny(MODULES.disable_prospect)
  .deleteAny(MODULES.disable_user)

  // >>>>>>>>>>>>>>> OPERADOR RECAUDADOR ------------------------------------------------------------------------------------------------

  .grant(ROLES.CLIENT)

  // >>>>>>>>>>>>>>> OPERADOR POSICION ------------------------------------------------------------------------------------------------

  .grant(ROLES.SETTER)

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

  // DELETE
  .deleteAny(MODULES.disable_client)
  .deleteAny(MODULES.disable_prospect)

  // >>>>>>>>>>>>>>> OPERADOR LOGISTICA ------------------------------------------------------------------------------------------------

  .grant(ROLES.CLOSER)

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

  // DELETE
  .deleteAny(MODULES.disable_client)
  .deleteAny(MODULES.disable_prospect);

// >>>>>>>>>>>>>>> LIQUIDADOR CAJA ------------------------------------------------------------------------------------------------

module.exports = {
  ac,
  ROLES,
  MODULES,
};
