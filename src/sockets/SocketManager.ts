import {Intents} from "../utils/Intents";
import {Custom_reward_redemption} from './eventsub/subscriptions/custom_reward_redemption';
export class SocketManager{

    private intents: Array<any>;
    public sessionId;
    public token;
    public clientId;
    public userId;
    constructor(props: {intents: Array<any>, token: string, clientId: string, userId: string, sessionId: string}) {
        this.sessionId = props.sessionId;
        this.token = props.token;
        this.clientId = props.clientId;
        this.userId = props.userId;
        this.intents = props.intents;
    }

    connectToEvents(){
        this.intents.forEach(intents => {
            switch (intents){
                case Intents.custom_reward_redemption:
                    let rewardRedemption = new Custom_reward_redemption({token: this.token, userId: this.userId, clientId: this.clientId, sessionId: this.sessionId})
                    rewardRedemption.addReward().then(r => console.log("reward redemption succefuly added "));
            }
        })

    }
}
