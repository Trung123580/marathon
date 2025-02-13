import React from "react"

const SupportBtn = () => {
  return (
    <div className='fixed z-20 right-5 bottom-5 w-max'>
      <a href='https://www.facebook.com/XmaXMediaVN' target='_blank'>
        <video className="object-contain" controls={false} autoPlay={true} loop={true} muted>
            <source src="/messenger.mp4" />
        </video>
      </a>
    </div>
  )
}

export default SupportBtn
