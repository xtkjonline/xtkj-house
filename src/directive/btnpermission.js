export const btn = (dom, obj) => {
    if (!obj.value.includes(sessionStorage.getItem('role'))) {
        dom.remove()
    }
}