export function joinStyles(...values: string[]) {
	return values
        .map(value => value.split(';').map(v => v.trim()))
        .flat()
        .filter(Boolean)
        .join(';')
        || undefined
}
