import { Suspense } from "react"
import { Loading } from "@ds/index"
import Home from "@pages/home"
import UseCase from '@/domain/usecases/home'
import DataSource from '@/data/data-source/home'
import HttpClient from "@/infra/http"

const FactoryHome = () => {
    const DataSourceHome = new DataSource(new HttpClient)
    return (
        <Suspense fallback={<Loading />}>
            <Home useCase={UseCase(DataSourceHome)} />
        </Suspense>
    )
}

export default FactoryHome