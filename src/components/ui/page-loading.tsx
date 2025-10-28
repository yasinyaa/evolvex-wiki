import { Spinner } from "./spinner";

export function PageLoading() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Spinner />
        </div>
    )
}