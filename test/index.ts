import {TwitchApi} from "../TwitchAPi";
import {Intents} from "../src/utils/Intents";
import * as config from "../../config.json"
const client = new TwitchApi({
    intent: [Intents.custom_reward_redemption]
})
client.on("reward_redemption_add", message => {
    console.log("Yaouu");
});
client.login({
    token: config.token,
    clientId: config.clientId,
    userId: config.userId
})

