Atatus with Meteor
==================

[Atatus](https://www.atatus.com) integration for Meteor. Includes [atatus.js](https://github.com/atatus/atatus-js) for frontend error tracking and performance monitoring.

[Signup for Atatus](https://www.atatus.com/signup).

### Installation

Add package using `meteor add atatus:atatus`

Add `AtatusNotifier.initialize(settings)` to `Meteor.startup()` on the client, ie:

```javascript
Meteor.startup(function () {
    AtatusNotifier.initialize({
      client: {
        apiKey: 'YOUR_API_KEY',
        options: {
            tags: ['paid_user', 'premium'],
            customData: {
              name: "John Doe",
              plan: "premium",
              beta_access: true
            },
            version: '1.0.0'
        }
      },
      trackUser: true
    });
});
```

where `client.apiKey` is your project's API key. `client.options` is an advanced
configuration to atatus and it is optional.

If you are using the Meteor Accounts package, you can enable user tracking on errors with `trackUser` option.

### Notify Error

Atatus can capture errors automatically. You can also manually notify error as follows
```javascript
AtatusNotifier.notify(new Error('Test error'));
```

Optionally you can pass a custom data as second argument and tags as third argument:
```javascript
AtatusNotifier.notify(new Error('Test error'), {
      name: "John Doe",
      plan: "premium",
      beta_access: true
    }, ['production', 'premium']);
```

Atatus also works very well with saving full error and exception stack traces. Simply pass an Error or a Meteor.Error object to the log method to keep the stack trace.
```javascript
AtatusNotifier.notify(new Meteor.Error(422, 'Failed to save object to database'));
```
