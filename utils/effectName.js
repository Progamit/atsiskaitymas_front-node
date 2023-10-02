export const effectName = (effect:string) => {
    if (effect === 'critical') return "Critical chance"
    if (effect === 'dodge') return "Dodge chance"
    return "Life-steal chance"
}