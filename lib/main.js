/**
 * Atatus JavaScript notifier for Meteor.
 */
'use strict';
var isAtatusEnabled = false;
var trackUser = false;
var client;

/**
 * Init the atatus.
 *
 * Options:
 *  * trackUser: set to true: include in each message the Meteor user's username,
 *               if they're logged in. NOTE: Applies to the client only.
 *
 * @param settings object  Client configurations.
 */
function initialize(settings) {
  settings.client = settings.client || false;
  settings.server = settings.server || false;
  trackUser = typeof settings.trackUser !== 'undefined' && settings.trackUser === true;

  if (Meteor.isClient && settings.client && settings.client.apiKey) {
    debug('Client initialize ' + settings.client);
    client = window.atatus;
    client.config(settings.client.apiKey, settings.client.options).install();
    isAtatusEnabled = true;
  }
}

/**
 * Notify a error to Atatus.
 *
 * @param message     Error to log
 * @param customData  Optionally add a meta data object
 * @param tags        Optionally add a tag array
 */
function notify(message, customData, tags) {
  if (!isAtatusEnabled) {
    debug('AtatusNotifier is not enabled');
    return;
  }

  if (trackUser && Meteor.isClient) {
    setUser(Meteor.user()); // temp work-around because user() is not set on load but reactive
  }

  if (message instanceof Error) {
    client.notify(message, customData, tags);
  } else {
    client.notify(new Error(message), customData, tags);
  }
}

/**
 * Set the currently logged in user; for correlating error reports to a user.
 *
 * @param user User|null
 */
function setUser(user) {
  if (Meteor.isServer) {
    return;
  }

  if (user === null || typeof user === 'undefined') { // no one is logged in
    window.atatus.resetUser(); // remove data if present
    return;
  }

  if (user.username && user.emails && user.emails.length > 0 && user.profile) {
    window.atatus.setUser(user.username || user._id, user.emails[0].address, user.profile.name);
  }
}

/**
 * Log debugger.
 */
function debug(message) {
  //console.log(message);
}

AtatusNotifier = {
  initialize: initialize,
  notify: notify
};
