const getCursor = url => {
    const searchParams = new URLSearchParams(url.split("?")[1]);
    return searchParams.get("cursor")
}

export { getCursor }
