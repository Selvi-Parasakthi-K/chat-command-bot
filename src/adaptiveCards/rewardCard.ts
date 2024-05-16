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
            },
            {
                type: "Image",
                // url:"https://static.vecteezy.com/system/resources/previews/029/922/265/original/gold-congrats-in-gold-frame-with-black-and-gold-ribbon-stock-illustration-vector.jpg",
                // url:"../assets/Reward_Rally.png"
                url:cardData.image
            }
        ],
        $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
        version: "1.4"
    };
}