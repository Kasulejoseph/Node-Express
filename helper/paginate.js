export default (req) => {
    const match = {}
    const sort = {}
    let skip = req.query.skip ? parseInt(req.query.skip) : 0
    let limit = req.query.limit ? parseInt(req.query.limit) : 2
    if (req.query.complete) {
        match.complete = req.query.complete === 'true'
    }
    if (req.query.sort) {
        const parts = req.query.sort.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    const nextLimit = limit + 2
    const prevLimit = limit > 0 ? parseInt(limit) - 2 : 0
    const prevSkip = prevLimit > 0 ? parseInt(prevLimit) - 2 : 0
    const nextPage = `skip=${limit}?limit=${nextLimit}`
    const prevPage = `skip=${prevSkip}?limit=${prevLimit}`

    return {match, sort, limit, skip, nextPage, prevPage}
}