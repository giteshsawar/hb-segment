import { pubsubEvents } from '../constants/pubsub-events';
import SegmentServices from './segment';
// import logger from 'pino';

const redisEventsInit = (subscriber: any) => {
  subscriber.subscribe('segment');

  subscriber.on('message', (channel: string, message: string) => {
    const messageObj = JSON.parse(message);

    sendDataToSegment(messageObj);
  });
};

// call segment tracking APIs
function sendDataToSegment(message: { event: string, body: any }) {
  const { event, body } = message;

  switch(event) {
    case pubsubEvents.IDENTIFY_USER:
      SegmentServices.identifyUser(body);
      return;
    case pubsubEvents.IDENTIFY_USERGROUP:
      SegmentServices.identifyUserGroup(body);
      return;
    case pubsubEvents.PAGE_VISIT:
      SegmentServices.pageVisit(body);
      return;
    case pubsubEvents.TRACK_ACTIVITY:
      SegmentServices.trackActivity(body);
      return;
    case pubsubEvents.ALIAS_USER:
      SegmentServices.aliasUser(body);
      return;
    default:
      return;
  }
}

export default redisEventsInit;
