import { EventList } from '@/components/EventList'
import { getEvents } from '@/services'

export default async function Home() {
  const {data} =  await getEvents({displayStatus: 'show', groupType: 'internal', source: process.env.NEXT_PUBLIC_SOURCE as string})
  return (
    <main>
      <EventList dataEvents={data}/>
    </main>
  )
}

