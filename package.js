Package.describe({
  summary: 'Integrate with Atatus JS for JavaScript errors and performance metrics',
  version: '0.0.8',
  name: 'atatus:atatus',
  git: 'https://github.com/atatus/atatus-meteor.git'
});

Package.onUse(function (api, where) {
  api.versionsFrom('METEOR@0.9.0');
  api.addFiles('lib/main.js', [ 'client' ]);
  api.addFiles('vendor/atatus.min.js', 'client');

  api.export([
    'AtatusNotifier'
  ], [
    'client'
  ]);
});
