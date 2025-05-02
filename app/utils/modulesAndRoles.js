const MODULES = {
  get_users: "get_users",
  register_user: "register_user",
  edit_user: "edit_user",
  get_user_by_id: "get_user_by_id",
  login_user: "login_user",
  disable_user: "disable_user",

  /////////////////////

  get_artists: "get_artists",
  register_artist: "register_artist",
  edit_artist: "edit_artist",
  get_artist_by_id: "get_artist_by_id",
  disable_or_active_artist: "disable_or_active_artist",
  archive_or_show_artist: "archive_or_show_artist",

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
