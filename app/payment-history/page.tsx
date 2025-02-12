import { getUserTransactions } from "@/services"
import { cookies } from "next/headers"
import PageComponent from "./PageComponent"

const page = async () => {
  const cookiesParam = await cookies()
  const token = cookiesParam.get("token-app")?.value ?? ""
  const {data} = await getUserTransactions({ token })
  return <PageComponent dataHistory={data?.data ?? []}/>
}

export default page
