import { getUserTransactions } from "@/services"
import { cookies } from "next/headers"
import PageComponent from "./PageComponent"
import { redirect } from "next/navigation"
const page = async () => {
  const cookiesParam = await cookies()
  const token = cookiesParam.get("token-app")?.value ?? ""
  const {data} = await getUserTransactions({ token })
  if (!token) redirect('/') 
  return <PageComponent dataHistory={data?.data ?? []}/>
}

export default page
