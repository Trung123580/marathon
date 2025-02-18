type EventItem = {
  banner: string
  code: string
  displayStatus: string
  groupId: string
  groupName: string
  id: string
  logo: string
  name: string
  nameEN: string
}
type Payment = {
  price: number
  transCode: string
}
type PackagesItem = {
  eventCode: string
  packageCode: string
  packageName: string
  packageDescription: string
  packageType: string
  contentType: string
  price: number
  discount: number
  finalPrice: number
  isActive: boolean
  id: number 
  updatedAt: string
}