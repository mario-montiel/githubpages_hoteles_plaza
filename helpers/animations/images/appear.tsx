// React and Next
import { RefObject } from "react";

// CSS

export const appear = (imageRef: RefObject<HTMLImageElement>) => {
    console.log(imageRef);
    console.log('ENTRO APPEAR');
    
    // imageRef.current?.classList.remove(styles.image_opacity)
}

export const appearToLeftAfterScrollDown = (htmlElement: any, isShow: boolean) => {
    if (isShow) { htmlElement.classList.remove("is-hidden_right") }
    else { htmlElement.classList.add("is-hidden_right") }
}

export const appearToRightAfterScrollDown = (htmlElement: any, isShow: boolean) => {
    console.log(htmlElement, isShow);
    
    if (isShow) { htmlElement.classList.remove("is-hidden_left") }
    else { htmlElement.classList.add("is-hidden_left") }
}