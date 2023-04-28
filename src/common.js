export function getColor(index) {
    if(index < 50) {
        return `hsl(0, 100%, ${index}%)`;
    }
    else if(index < 350) {
        return `hsl(${index - 50}, 100%, 50%)`;
    }
    else {
        return `hsl(300, 100%, ${index - 300}%)`
    }
}