import { TeamsActivityHandler, TurnContext } from "botbuilder";

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

        const parsedData = {
            points: points,
            sender: sender,
            recipient: recipient,
            reason: reason,
            sender_id: sender_id,
            recipient_id: recipient_id
        };

        console.log(parsedData);
    }

    async onMessageActivity(context: TurnContext) {
        await this.handleMessage(context);
    }
}