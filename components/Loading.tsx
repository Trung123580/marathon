import Image from "next/image"
const Loading = () => {
  return (
    <div className='h-screen w-screen fixed top-0 left-0 bg-black/20 z-[999] flex items-center justify-center'>
      <Image src='/loading.gif' width={100} height={100} priority alt="" />
    </div>
  )
}

export default Loading