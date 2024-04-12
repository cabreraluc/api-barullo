const MODULES = {
  get_prospects: "get_prospects",
  get_prospect_by_id: "get_prospect_by_id",
  register_prospect: "register_prospect",

  edit_prospect: "edit_prospect",
  disable_prospect: "disable_prospect",
  get_prospects_paginate: "get_prospects_paginate",
  change_prospect_status: "change_prospect_status",
  change_interest_level: "change_interest_level",

  ///////////////////
  get_users: "get_users",
  register_user: "register_user",
  edit_user: "edit_user",
  get_user_by_id: "get_user_by_id",
  login_user: "login_user",
  disable_user: "disable_user",
  /////////////////////
  get_clients: "get_clients",
  get_client_by_id: "get_client_by_id",
  register_client: "register_client",
  login_client: "login_client",
  edit_client: "edit_client",
  disable_client: "disable_client",
  get_clients_paginate: "get_clients_paginate",

  /////////////////////
  register_activity: "register_activity",
  get_activity_by_id: "get_activity_by_id",
  get_activities_by_day: "get_activities_by_day",
  get_activities: "get_activities",
  edit_activity: "edit_activity",
  archive_activity: "archive_activity",

  ////////////////
  get_artists: "get_artists",
  register_artist: "register_artist",
  edit_artist: "edit_artist",
  get_artist_by_id: "get_artist_by_id",
  disable_artist: "disable_artist",
  ///////////////
  get_events: "get_events",
  register_event: "register_event",
  edit_event: "edit_event",
  get_event_by_id: "get_event_by_id",
  disable_event: "disable_event",
};

const ROLES = {
  ADMIN: "Admin",
  MEMBER: "Member",
};

module.exports = {
  MODULES,
  ROLES,
};
