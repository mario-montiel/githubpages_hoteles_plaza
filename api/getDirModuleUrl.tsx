import { NextApiRequest } from "next";
import Route from "next/router"

// const router = useRouter()

export const getModuleUrl = async (req: NextApiRequest) => {
    const url = req.rawHeaders

    if (url.length < 31) { return false }

    const split = url[31].split('/')
    
    if (split.length < 7) { return false }
    
    return split[5] + '/' + split[6] + '/' + split[7]
}