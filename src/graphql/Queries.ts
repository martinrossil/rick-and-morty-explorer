export function characterPage(name = '', page = 1): string {
    return `
    { 
        characters(filter: { name: "` + name + '" }, page: ' + page + `) {
            info {
                count
                pages
                prev
                next
            }
            results {
                id
                name
                gender
                status
                species
                location {
                    name
                }
                episode {
                    name
                    episode
                }
            }
        }
    }`
}
