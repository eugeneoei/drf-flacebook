const lockBodyElement = () => {
    document.querySelector("body").style.overflow = "hidden";
};

const unlockBodyElement = () => {
    document.querySelector("body").style.overflow = null
};

export { lockBodyElement, unlockBodyElement };
