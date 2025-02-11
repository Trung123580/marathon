import { getUserTransactions } from "@/services"
import { cookies } from "next/headers"
import PageComponent from "./PageComponent"

const page = async () => {
  const cookiesParam = await cookies()
  const token = cookiesParam.get("token-app")?.value ?? ""
  const response = await getUserTransactions({ token })
  console.log(token, response)
  return <PageComponent />
}

export default page
