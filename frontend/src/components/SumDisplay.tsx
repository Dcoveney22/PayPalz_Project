import Loader from './Loader'

type SumDisplayProps = {
  sum: number
  isFetching: boolean
}

function SumDisplay({ sum, isFetching }: SumDisplayProps) {
  return <h1 id="sumDisplay">{isFetching ? <Loader /> : `${sum}$`}</h1>
}

export default SumDisplay
