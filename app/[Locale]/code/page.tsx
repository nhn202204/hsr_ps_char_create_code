import MakeCode from "@/components/MakeCode"

const MakeCodePage = ({ searchParams }: { searchParams: { ids: string | string[] | undefined } }) => {

  let { ids } = searchParams

  if (ids === undefined) return null

  if (typeof (ids) === "string") {
    ids = ids.split(", ")
  }

  if (!Array.isArray(ids)) return null

  if (ids.length < 1) return (<h1 className="w-full flex justify-center">Bạn chưa chọn Char / Char not picked yet</h1>)

  return (
    <MakeCode />
  )
}

export default MakeCodePage