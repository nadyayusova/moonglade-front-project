import { Loading } from '@/components'
import { Dispatch, SetStateAction } from 'react'

interface LoaderProps {
	setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Loader({ setIsLoading }: LoaderProps) {
	return <Loading setIsLoading={setIsLoading} />
}
