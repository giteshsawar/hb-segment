import { v4 } from 'uuid';
import Analytics from 'analytics-node';
import logger from 'pino';

const analytics = new Analytics(process.env.SEGMENT_SOURCE_ID);

const SegmentServices = {
    identifyUser: ({ userId, traits, context }) => {
        try {
            const userIdentifier = {
                userId,
                anonymousId: userId ? null : v4(),
                traits,
                context
            };
            logger().info(`${String(userIdentifier.context)}: ${String(userIdentifier.traits.name)}`);
            analytics.identify(userIdentifier);
        } catch(err) {
            logger().info(String(err));
        }
    },
    identifyUserGroup: ({ userId, groupId, traits, context, integrations }) => {
        try {
            const userGroup = {
                userId,
                groupId,
                traits,
                context,
                integrations
            };
            analytics.group(userGroup);
        } catch(err) {
            logger().info(String(err));
        }
    },
    trackActivity: ({ userId, event, properties, context }) => {
        try {
            const activityInfo = {
                userId,
                anonymousId: userId ? null : v4(),
                event,
                properties,
                context
            };
            analytics.track(activityInfo);
        } catch(err) {
            logger().info(String(err));
        }
    },
    pageVisit: ({ userId, category, name, properties, context }) => {
        try {
            const visitInfo = {
                userId,
                anonymousId: userId ? null : v4(),
                category,
                name,
                properties,
                context
            };
            analytics.page(visitInfo);
        } catch(err) {
            logger().info(String(err));
        }
    },
    aliasUser: ({ previousId, userId }) => {
        try {
            analytics.alias({ previousId, userId });
        } catch(err) {
            logger().info(String(err));
        }
    }
};

export default SegmentServices;
