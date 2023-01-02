import {Intents} from "../utils/intents";
import {CustomRewardRedemption} from './eventsub/subscriptions/customRewardRedemption';
import {ChannelUpdate} from "./eventsub/subscriptions/channelUpdate";
import {ChannelFollow} from "./eventsub/subscriptions/channelFollow";
export class SocketManager{

    private intents: Array<any>;
    public sessionId;
    public token;
    public clientId;
    public userId;

    /**
     *
     * @param props: {intents: Array<any>, token: string, clientId: string, userId: string, sessionId: string}
     */
    constructor(props: {intents: Array<any>, token: string, clientId: string, userId: string, sessionId: string}) {
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
    connectToEvents(){
        let props = {token: this.token, userId: this.userId, clientId: this.clientId, sessionId: this.sessionId};
        this.intents.forEach(intents => {
            switch (intents){
                case Intents.CustomRewardRedemptionAdd:
                    let rewardRedemption = new CustomRewardRedemption(props)
                    rewardRedemption.addReward().then(r => console.log("reward redemption succefuly added "));
                    break;
                case Intents.ChanneUpdate:
                    let channelUpdateClass = new ChannelUpdate(props)
                    channelUpdateClass.addChannelUpdateEvent().then(e => console.log("channel update succefuly added "));
                    break;
                case Intents.ChannelFollow:
                    let channelFollow = new ChannelFollow(props);
                    channelFollow.addChannelFollow().then(r => console.log("channel follow succesfully added"));
                    break;
            }
        })

    }
}
