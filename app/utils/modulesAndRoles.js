const MODULES = {
  get_prospects: "get_prospects",
  get_prospect_by_id: "get_prospect_by_id",
  register_prospect: "register_prospect",
  edit_prospect: "edit_prospect",
  disable_prospect: "disable_prospect",
  get_prospects_paginate: "get_prospects_paginate",

  ///////////////////
  get_users: "get_users",
  register_user: "register_user",
  get_user_by_id: "get_user_by_id",
  login_user: "login_user",
  edit_user: "edit_user",
  disable_user: "disable_user",
  /////////////////////
  get_clients: "get_clients",
  get_client_by_id: "get_client_by_id",
  register_client: "register_client",
  login_client: "login_client",
  edit_client: "edit_client",
  disable_client: "disable_client",
  get_clients_paginate: "get_clients_paginate",
};

const ROLES = {
  ADMIN: "Admin",
  CLOSER: "Closer",
  SETTER: "Setter",
  CLIENT: "Client",
};

module.exports = {
  MODULES,
  ROLES,
};
