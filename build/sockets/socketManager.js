"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
var intents_1 = require("../utils/intents");
var customRewardRedemption_1 = require("./eventsub/subscriptions/customRewardRedemption");
var channelUpdate_1 = require("./eventsub/subscriptions/channelUpdate");
var SocketManager = /** @class */ (function () {
    /**
     *
     * @param props: {intents: Array<any>, token: string, clientId: string, userId: string, sessionId: string}
     */
    function SocketManager(props) {
        this.sessionId = props.sessionId;
        this.token = props.token;
        this.clientId = props.clientId;
        this.userId = props.userId;
        this.intents = props.intents;
    }
    /**
     * @private
     * connect into event by socket
     */
    SocketManager.prototype.connectToEvents = function () {
        var props = { token: this.token, userId: this.userId, clientId: this.clientId, sessionId: this.sessionId };
        this.intents.forEach(function (intents) {
            switch (intents) {
                case intents_1.Intents.CustomRewardRedemptionAdd:
                    var rewardRedemption = new customRewardRedemption_1.CustomRewardRedemption(props);
                    rewardRedemption.addReward().then(function (r) { return console.log("reward redemption succefuly added "); });
                    break;
                case intents_1.Intents.ChanneUpdate:
                    var channelUpdateClass = new channelUpdate_1.ChannelUpdate(props);
                    channelUpdateClass.addChannelUpdateEvent().then(function (e) { return console.log("channel update succefuly added "); });
                    break;
            }
        });
    };
    return SocketManager;
}());
exports.SocketManager = SocketManager;
//# sourceMappingURL=socketManager.js.map