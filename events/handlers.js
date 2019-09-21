import eventEmitter from '../helpers/eventEmitter';
import Notifications from './Notifications';
import eventTypes from './eventTypes';
import highlightsLogic from '../lib/highlightsLogic';

const { updateHighlights } = highlightsLogic;


const handlers = {
  register(io) {
    eventEmitter.on(
      eventTypes.ARTICLE_NOTIFICATION_EVENT,
      payload => Notifications.addNotification(payload, io)
    );

    eventEmitter.on(
      eventTypes.COMMENT_NOTIFICATION_EVENT,
      payload => Notifications.addNotification(payload, io)
    );

    eventEmitter.on(
      eventTypes.RATING_INTERACTION_EVENT,
      payload => Notifications.addNotification(payload, io)
    );

    eventEmitter.on(
      eventTypes.FOLLOW_INTERACTION_EVENT,
      payload => Notifications.followNotification(payload, io)
    );

    eventEmitter.on(
      eventTypes.UPDATEHIGHLIGHT_EVENT,
      (highlightedPortions, body, userId) => updateHighlights(highlightedPortions, body, userId)
    );
  }
};

export default handlers;
