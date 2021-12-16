export function toConsole(input: any) {
    Object.entries(input).forEach(([key, value]) => {
        console.log(key)
        Object.entries(value as any).forEach(([vkey, vvalue]) => {
            console.log(vkey + " : " + vvalue)
        })
        console.log("")
    })
}
