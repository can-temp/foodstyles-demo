# Notes
--------

- Since the actual app also uses TypeScript and there's no restriction about only using JavaScript on the doc, I used TypeScript which is my preferred language that speeds up development.

- I've used React Native 0.68.x as 0.69 had some dramatic changes that might block my development in limited time. I've used redux for state management, with redux-saga for action logic.

- I've used functional components and hooks, yet I'm perfectly familiar with class components and mapState... functions too.

- I haven't hidden the status bar on the overlay screen, as it was glitching the transition animation. In a proper app which has actual navigation stack and a hierarchy, that would be implemented properly. Due to limited time and having a single actual screen, I haven't set up navigation.

- The share sheet isn't populated with the icon and the title of the card. This is because it's populated from the metadata (<meta> tags, OG entries, heuristics etc.) and there isn't actual data coming from the server.

- The orange gradient on the top of the screen is slightly desaturated compared to the designs. While I copied the exact colors with hex codes, it's most likely due to React Native not supporting P3 Gamut colors out of the box (I have a patch for that which I'm using in my apps to patch `UIColor` and `UIImage` at native Objective-C level to display them in full, which would most likely fix it and make all the colors richer, but for the sake of the demo I've left it as-is as it involves native code patching).

- I've tried to match the designs which is designed for iPhones that do have a home button and do not have a notch. Because of this, there is some visual disreciprocy between the design and the app running on newer "notched" models, especially at the bottom area. The fix is to access safe area insets, and calculate a value that plays well with both types. Since I don't have designs for notched phones and also due to time constraints, I've skipped perfecting it for notched/buttonless models.

- When details for an item towards the bottom of the list is opened, the options might bleed outside the screen area. This can be fixed by animating the Y transform of the overlay from original position to something like -150, if, say, the original item is close to the bottom of the screen. Since there's no exact requirement for that and due to limited time, I haven't implemented such transition, so the buttons might bleed off if there are many items and we tap details of something at the bottom.

- In an actual app I'd implement showing "no items" and a loading spinner. For the sake of demo, I haven't.

- The transition animation could be better but I'm running out of time. Lost most of the time on setting up the RN project properly in the beginning.