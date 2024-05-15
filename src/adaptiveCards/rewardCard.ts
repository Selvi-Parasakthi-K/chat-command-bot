import { CardData } from "../cardModels";

export function createCardJson(cardData: CardData): any {
    return {
        type: "AdaptiveCard",
        body: [
            {
                type: "TextBlock",
                size: "Medium",
                weight: "Bolder",
                text: cardData.title
            },
            {
                type: "TextBlock",
                text: cardData.body,
                wrap: true
            }
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.4"
    };
}