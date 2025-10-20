import { Spinner } from "./spinner";

type LoadingSwapProps = {
    isLoading: boolean
    children: React.ReactNode
}

export const LoadingSwap = ({isLoading, children}: LoadingSwapProps): React.ReactElement => isLoading ? <Spinner /> : <>{children}</>