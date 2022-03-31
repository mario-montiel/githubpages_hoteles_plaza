
// CSS
import styles from './Reviews.module.css'

// Components

const Reviews = (props: any) => {
    // console.log(props);

    // Variables

    // Use States

    // Functions
    const handleReview = (index: number) => {
        props.confirmToRemoveReview(true, index)
    }

    const generateStars = (rating: number) => {
        let html: any = []
        for (let index = 0; index < 5; index++) {
            const validate = (index) >= rating

            html.push(
                validate ? (
                    <button key={index}>
                        <svg className={styles.svg_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z" />
                        </svg>
                    </button>
                ) : (
                    <button className={styles.star_selected} key={index}>
                        <svg className={styles.svg_icon} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                        </svg>
                    </button>
                )
            )
        }
        return html
    }

    const reloadReviews = () => {
        props.reloadReviews()
    }

    return (
        <section className={styles.reviews_section}>
            <p>Comentarios: <strong>{props.reviews.length}</strong></p>
            <button type='button' className={styles.btn_reload} onClick={reloadReviews}>
                <svg className={styles.svg_icon} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
                </svg>
            </button>
            <div className={styles.reviews_grid}>
                {
                    props.reviews.length ? (
                        props.reviews.map((review: any, index: number) =>
                            <div className={styles.review_card} key={index}>
                                <button type="button" onClick={() => handleReview(index)}>
                                    <svg className={styles.svg_icon} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                                    </svg>
                                </button>
                                <p>{review.author_name}</p>
                                <div className={styles.rating_container}>
                                    <div className={styles.stars_container}>
                                        {generateStars(review.rating)}
                                    </div>
                                    <p>{review.rating} / 5</p>
                                </div>
                                <p>{review.text}</p>
                                <p>{review.relative_time_description}</p>
                            </div>
                        )
                    ) : null
                }
            </div>
        </section>
    )
}

export default Reviews