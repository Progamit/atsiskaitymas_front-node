export const checkGrade = (grade:string) => {
    if(grade === 'A') return "text-success"
    if(grade === 'B') return "text-primary"
    if(grade === 'C') return "text-warning"
    return "text-secondary"
}