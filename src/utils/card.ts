export function getRandomName(){
    const names = [
        'My food style',
        'Vegan for me',
        'Brunchy munchie',
        'Binge eating but healthy',
        'Food to consume coming up with random card names',
        'Weekend party',
        'Keto diet',
    ];
    return names[Math.floor(Math.random() * names.length)];
}