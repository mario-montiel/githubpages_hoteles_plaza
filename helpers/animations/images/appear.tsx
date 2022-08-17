// React and Next
import { RefObject } from "react";

// CSS

export const appear = (imageRef: RefObject<HTMLImageElement>) => {
    // imageRef.current?.classList.remove(styles.image_opacity)
}

export const appearToLeftAfterScrollDown = (htmlElement: any, isShow: boolean) => {
    if (isShow) { htmlElement.classList.remove("is-hidden_right") }
    else { htmlElement.classList.add("is-hidden_right") }
}

export const appearToRightAfterScrollDown = (htmlElement: any, isShow: boolean) => {
    if (isShow) { htmlElement.classList.remove("is-hidden_left") }
    else { htmlElement.classList.add("is-hidden_left") }
}