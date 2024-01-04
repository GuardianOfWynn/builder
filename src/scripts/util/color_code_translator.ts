export enum ColorCode {
    BLACK = 'black',
    DARK_BLUE = 'mc-dark-blue',
    DARK_GREEN = 'mc-dark-green',
    DARK_AQUA = 'mc-dark-aqua',
    DARK_RED = 'mc-dark-red',
    DARK_PURPLE = 'mc-dark-purple',
    GOLD = 'mc-gold',
    GRAY = 'mc-gray',
    DARK_GRAY = 'mc-dark-gray',
    LIME = 'mc-lime',
    AQUA = 'mc-aqua',
    RED = 'mc-red',
    LIGHT_PURPLE = 'mc-light-purple',
    YELLOW = 'mc-yellow',
    WHITE = 'white',
}

export const COLOR_CODE_MAP = new Map<String, ColorCode>([
    ['0', ColorCode.BLACK],
    ['1', ColorCode.DARK_BLUE],
    ['2', ColorCode.DARK_GREEN],
    ['3', ColorCode.DARK_AQUA],
    ['4', ColorCode.DARK_RED],
    ['5', ColorCode.DARK_PURPLE],
    ['6', ColorCode.GOLD],
    ['7', ColorCode.GRAY],
    ['8', ColorCode.DARK_GRAY],
    ['a', ColorCode.LIME],
    ['b', ColorCode.AQUA],
    ['c', ColorCode.RED],
    ['d', ColorCode.LIGHT_PURPLE],
    ['e', ColorCode.YELLOW],
    ['f', ColorCode.WHITE],
])

export interface Style {
    color: ColorCode,
    isUnderlined: boolean,
    isStrikedthrough: boolean,
    isBold: boolean,
    isItalic: boolean
}

export class MinecraftTextComponent {
    text: String;
    style: Style;
}

export function parseStyleToComponents(input: String): MinecraftTextComponent[] {
    let components: MinecraftTextComponent[] = [];

    let currentText = "";
    let currentStyle: Style = {
        color: ColorCode.GRAY,
        isBold: false,
        isItalic: false,
        isStrikedthrough: false,
        isUnderlined: false
    } 

    let formingStyle = true;
    let ignored: number[] = [];

    for(let i = 0; i < input.length; i++) {

        let currentChar = input[i];
        if(currentChar === '&') {
            if(!formingStyle) {
                components.push({
                    style: currentStyle,
                    text: currentText
                })
                formingStyle = true;
                currentStyle = {
                    color: ColorCode.GRAY,
                    isBold: false,
                    isItalic: false,
                    isStrikedthrough: false,
                    isUnderlined: false
                } ;
                currentText = "";
                formingStyle = true;
            }
            if(i === input.length - 1) {
                currentText += currentChar;
                components.push({
                    style: currentStyle,
                    text: currentText
                })
                continue;
            }
            let next = input[i + 1];
            ignored.push(i + 1);
            if(COLOR_CODE_MAP.has(next)) {
                currentStyle.color = COLOR_CODE_MAP.get(next)!;
                continue;
            } else {
                if(next === 'l') {
                    currentStyle.isBold = true;
                    continue;
                }
                if(next === 'm') {
                    currentStyle.isStrikedthrough = true;
                    continue;
                }
                if(next === 'o') {
                    currentStyle.isItalic = true;
                    continue;
                }
                if(next === 'n') {
                    currentStyle.isUnderlined = true;
                    continue;
                }
                if(next === 'r') {
                    components.push({
                        style: currentStyle,
                        text: currentText
                    })
                    formingStyle = true;
                    currentStyle = {
                        color: ColorCode.GRAY,
                        isBold: false,
                        isItalic: false,
                        isStrikedthrough: false,
                        isUnderlined: false
                    } ;
                    currentText = "";
                    continue;
                }
            }
            
        } else{
            if(!ignored.includes(i)) {
                currentText += currentChar;
                formingStyle = false;
            }
        }
    }
    components.push({
        style: currentStyle,
        text: currentText
    })

    return components;
}

