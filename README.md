###outsideclick
####Custom jQuery event

This custom event triggers when the user/code triggers a click outside of the element.

Since there are multiple ways for events to get trigger within jQuery this event has two optional namespaces available.

Event String | Event Action
-------------|--------------
_outsideclick.user_ | will only trigger if the user created the event via a click.
_outsideclick.trigger_ | will only trigger if you've programmatically triggered a `click` event via `trigger`
_outsideclick_ | will trigger regardless of how the event was created.


####Caveats
You cannot, currently, use event delegation to handle this event type. So the following will not work:

```js
$(selector).on('outsideclick', 'selector2', callback);
```

All events must be added to the element directly:

```js
$(selector).on('outsideclick', callback);

$(selector).on('outsideclick.user', callback);

$(selector).on('outsideclick.trigger', callback);
```
