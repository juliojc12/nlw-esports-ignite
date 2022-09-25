
export function convertHourToMinutes(hourString: string) {
    const [hours, minutes] = hourString.split(':').map(Number);

    const minutos = hours * 60 + minutes;

    return minutos;
}