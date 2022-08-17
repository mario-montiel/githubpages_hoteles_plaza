// React and Next
import { Fragment, useState } from "react";

// CSS
import styles from "./Steps.module.css"

// Componets

// Libraries

// Helpers

// Types
type Step = {
    children: JSX.Element,
    currentStep: number,
    maxSteps: number
}

const Steps = ({ children, /* redirectToStep,*/ currentStep, maxSteps }: Step) => {

    // Variables

    // Use Ref

    // Use State

    // Functions
    const generateSteps = () => {
        let html: any = []

        for (let index = 0; index < maxSteps; index++) {
            html.push(
                <Fragment key={index}>
                    <div
                        className={currentStep == (index + 1) ? `${styles.step_circle} ${styles.step_circle_selected}` : styles.step_circle}
                        // onClick={() => showStepForm(index)}
                    > {index + 1} </div>
                    <div className={currentStep == (index + 1) ? `${styles.line} ${styles.line_active}` : styles.line} />
                </Fragment>
            )
        }

        return html
    }

    // const showStepForm = (step: number) => { redirectToStep(step + 1) }

    // Use Effect

    return (
        <section className={styles.who_we_are}>
            <div className={styles.steps_container}>
                {generateSteps()}
            </div>
            {children}
        </section>
    )
}

export default Steps