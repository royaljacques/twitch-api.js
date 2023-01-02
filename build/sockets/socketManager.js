"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketManager = void 0;
var intents_1 = require("../utils/intents");
var custom_reward_redemption_1 = require("./eventsub/subscriptions/custom_reward_redemption");
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
        var _this = this;
        console.log(this.intents);
        this.intents.forEach(function (intents) {
            switch (intents) {
                case intents_1.Intents.CustomRewardRedemption:
                    var rewardRedemption = new custom_reward_redemption_1.Custom_reward_redemption({ token: _this.token, userId: _this.userId, clientId: _this.clientId, sessionId: _this.sessionId });
                    rewardRedemption.addReward().then(function (r) { return console.log("reward redemption succefuly added "); });
            }
        });
    };
    return SocketManager;
}());
exports.SocketManager = SocketManager;
//# sourceMappingURL=socketManager.js.map