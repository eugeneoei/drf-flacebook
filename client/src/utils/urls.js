const getCursor = url => {
    if (url) {
        const searchParams = new URLSearchParams(url.split("?")[1]);
        return searchParams.get("cursor")
    }
    return undefined
}

export { getCursor }
