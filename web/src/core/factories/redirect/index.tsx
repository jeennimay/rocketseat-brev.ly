import { Suspense } from "react"
import { Loading } from "@ds/index"
import Redirect from "@pages/redirect"

const FactoryRedirect = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Redirect />
        </Suspense>
    )
}

export default FactoryRedirect