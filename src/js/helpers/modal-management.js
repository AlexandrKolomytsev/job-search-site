export const modalOpen = function () {
    const body = document.querySelector("body");
    body.classList.add("no-scroll");
    body.style.paddingRight = '17px';
};

export const modalClose = function () {
    const body = document.querySelector("body");
    body.classList.remove("no-scroll");
    body.style.paddingRight = '0';
};

export default {
    modalOpen,
    modalClose,
};
