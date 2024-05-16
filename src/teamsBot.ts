import { TeamsActivityHandler, TurnContext, CardFactory, MessageFactory } from "botbuilder";
import axios from "axios";
import { CardData } from "./cardModels";
import { createCardJson } from "./adaptiveCards/rewardCard";

export class TeamsBot extends TeamsActivityHandler {
    constructor() {
        super();
    }

    async handleMessage(context: TurnContext) {
        const message = context.activity.text;
        const entities = context.activity.entities;
        const sender = context.activity.from.name;
        const sender_id = context.activity.from.id;
        let points, recipient, recipient_id, reason;
        
        entities.forEach(entity => {
            if (entity.type === "mention" && entity.mentioned) {
                if (entity.mentioned.name != sender) {
                    recipient = entity.mentioned.name;
                    recipient_id = entity.mentioned.id;
                }
            }
        });

        const parts = message.split(" "); 
        const indexFor = parts.indexOf("for");
        if (indexFor !== -1) {
            points = parseInt(parts[indexFor - 1]);
            reason = parts.slice(indexFor + 1).join(" "); 
        }

        if (!points || !recipient || !reason) {
            const cardData: CardData = {
                title: "Incorrect Input format",
                body: "The input given is incorrect. Please use the below format.`\n`@APP_NAME @RECIPIENT_NAME (POINTS) for (REASON)",
            };
            const cardAttachment = CardFactory.adaptiveCard(createCardJson(cardData));
            await context.sendActivity(MessageFactory.attachment(cardAttachment));
            return;
        }

        const requestData = {
            senderUserId: sender_id,
            receiverUserId: recipient_id,
            application: "65b736be3577a2ea0541f730",
            message: reason,
            count: points
        };

        try {
            const response = await axios.post('https://stage-gamificationapi.rewardrally.in/v1/recognition/', requestData);
            console.log('API Response:', response.data);

            const cardData: CardData = {
                title: "Congratulations!",
                body: `Your ${points} points have been successfully sent to ${recipient} for ${reason}.`,
            };
            const cardAttachment = CardFactory.adaptiveCard(createCardJson(cardData));
            await context.sendActivity(MessageFactory.attachment(cardAttachment));
        } catch (error) {
            console.error('Error sending request to API:', error);
            const cardData: CardData = {
                title: "API request failed",
                body: "There was an error in API request. Kindly wait and check again.",
            };
            const cardAttachment = CardFactory.adaptiveCard(createCardJson(cardData));
            await context.sendActivity(MessageFactory.attachment(cardAttachment));
        }
    }

    async onMessageActivity(context: TurnContext) {
        await this.handleMessage(context);
    }
}