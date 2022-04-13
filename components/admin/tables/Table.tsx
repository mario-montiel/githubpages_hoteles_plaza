// React

// Libraries

// Components and CSS
import { useRouter } from "next/router"
import styles from "./Table.module.css"

// Types
type Table = {
    data: Array<object>,
    thead: TheadTable,
    actions?: Object[],
    endpoint?: string
}

type TableButton = {
    url?: string,
    onClick?: () => void
}

type TheadTable = {
    titleOrigins: Array<String>,
    titleInWebsite: Array<string>
}

export default function Table(props: Table) {

    // Variables
    const router = useRouter()

    // States

    // useEffect

    // Functions
    function sendData() {

    }

    return props ? (
        <table className={styles.table}>
            <thead>
                <tr>
                    {
                        props.thead.titleInWebsite.map((thead, index) =>
                            <th key={index}>{thead}</th>
                        )
                    }
                </tr>
            </thead>
            

            {/* {
                props.data ? (
                    props.data.map((data: any, index: number) =>
                        <tbody key={index}>
                            <tr>
                                <td>{(index + 1)}</td>
                                <td>{data[props.thead.titleOrigins[index]]}</td>
                                <td>
                                    <div className={styles.container}>
                                        {
                                            props.actions ? (
                                                props.actions.map((button: any, i: number) =>
                                                
                                                    button.onClick ? (
                                                        <button className={styles.btn_action} key={i} onClick={() => button.onClick(data)}>
                                                            <div dangerouslySetInnerHTML={{__html: button.icon}} />
                                                        </button>
                                                    ): (<button className={styles.btn_action} key={i} onClick={() => router.push(`/aG90ZWxlc19wbGF6YQ0K/admin/system/${props.endpoint}/` + data.name)}>
                                                            <div dangerouslySetInnerHTML={{__html: button.icon}} />
                                                        </button>
                                                    )
                                                )
                                            ) : null
                                        }
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    )
                ) : null
            } */}
        </table>
    ) : null
}