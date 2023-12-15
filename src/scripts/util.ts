export enum CraftedAttackSpeed {
    SLOW = 1,
    NORMAL,
    FAST,
}

export class NumberRange {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }

    public static of(from: number, to: number) {
        return new NumberRange(from, to);
    }
}