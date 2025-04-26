
import { User, MessageCircleMore, Phone, Send, Mic, CheckCheck, CornerRightUp, MessageSquare } from 'lucide-react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div className='h-screen overflow-clip w-full bg-black text-neutral-50/90 relative'>
      <Navbar />
      <Main />
      <Texts />
    </div>
  )
}

export default Home





function Main() {
  return (
    <div className='hidden xl:flex w-[60rem]  mx-auto relative -top-14 flex-col gap-6'>
      {/* blocks-1 */}
      <div className='flex gap-4 items-end'>
        {/* sq. blue box */}
        <div className='bg-blue-400  text-black rounded-4xl px-4 py-4 size-40 flex flex-col justify-between'>
          <div>
            <p className='text-lg tracking-tight '>messages</p>
            <p className='text-3xl font-bold'>12</p>
          </div>

          <div className='flex justify-between items-center relative top-3'>
            <User size={28} fill='black' />
            <div className="avatar-group -space-x-6 scale-60 relative left-5">
              <div className="avatar border-[3.5px] border-white/80">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar border-[3.5px] border-white/80">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar border-[3.5px] border-white/80">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* rect. yellow box */}
        <div className='bg-lime-300 rounded-full px-3 py-4 w-64 h-[3.8rem] flex items-center justify-between'>
          <div className="avatar size-11 rounded-full">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className='bg-text font-bold text-black/90 text-lg'>
            Jacob Simmons
          </div>
          <div className='size-6 rounded-full bg-black grid place-items-center '>
            <p className='text-sm'>17</p>
          </div>

        </div>
      </div>

      {/* block-2 */}
      <div className='flex gap-6 relative -left-24 items-start'>
        <div className='bg-red-400/95 size-20 rounded-full flex items-center justify-center'>
          <MessageCircleMore color="oklch(70.4% 0.191 22.216)" fill='black' className='size-16' />
        </div>

        <div className='bg-neutral-700 rounded-2xl px-4 py-4 w-[22rem] flex justify-between'>
          <div className="avatar size-12 rounded-full top-1">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <div className='flex flex-col text-white/90 absolute top-4.5 left-43'>
            <h1 className='text-md tracking-wide'>Theresa Peterson</h1>
            <p className='text-sm text-white/80'>Yep, I have a new concept for tomorrow 👍</p>
          </div>

          <div className='size-5 rounded-full bg-green-400  relative -top-1'>
            <p className='text-black text-sm text-center'>4</p>
          </div>
        </div>

        <div className='bg-neutral-50 h-13 w-80 rounded-full relative'>
          <input type="text" className='border w-full rounded-full h-full text-black text-lg px-6 capitalize ' placeholder='Enter you message...' />

          <div className='size-11 bg-black rounded-full flex items-center justify-center absolute top-1 right-1'>
            <Mic color="#eed8d8" className='' />
          </div>

        </div>
      </div>

      {/* block-3 */}
      <div className='flex gap-4 relative z-10'>
        <div className='flex text-[12px] gap-2 relative top-12 '>
          <CheckCheck color='lightgreen' size={20} />
          <p className='text-slate-50/80'>11:34am</p>
        </div>

        <div className='bg-blue-400  text-black rounded-2xl px-3 py-2 h-fit w-[20rem] flex justify-between'>
          <div className="avatar size-12 rounded-full">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <div className='flex flex-col absolute top-2 left-43'>
            <h1 className='text-md tracking-wide font-medium'>Larry Summer</h1>
            <p className='text-sm'>Ok, I will edit and send it back 😭🙏</p>
          </div>
        </div>

        <div className='absolute bottom-9 left-62 h-9 w-40 bg-red-400 rounded-full flex items-center pl-2'>
          <Send size={18} color='white' className='' />
          <p className='text-sm pl-4 py-1.5 font-medium text-black'>new messages</p>
        </div>

        <div className='bg-green-400 size-37 rounded-4xl relative -top-8.5 px-3 py-2 flex flex-col '>
          <CornerRightUp size={60} strokeWidth={1} color='black' />
          <div className='flex flex-col text-black p-2'>
            <p className='text-2xl font-semibold'>865<span className='text-sm px-1'>m</span></p>
            <p className='text-[15px] font-medium tracking'>location</p>
          </div>
        </div>

        <div className='size-20 bg-lime-200 rounded-full flex items-center justify-center relative top-9'>
          <Phone size={36} fill='black' color='transparent' />
        </div>

      </div>


      <div className='relative -top-30 left-115'>
        <img
          src='https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large_2x.jpg'
          className="object-cover w-[50rem] "
          alt=""
        />
      </div>
    </div>
  )
}


function Texts() {
  return (
    <>
      {/* top-left */}
      <div className='block w-64 text-3xl leading-[2.1rem] text-white/90 absolute top-32 right-20 p-12'>
        <div className='relative drop-shadow-2xl' >
          <MessageSquare size={295} strokeWidth={0.2} />
          <div className='absolute top-12 left-11.5 text-[2.5rem] font-bold'>
            fast, reliable
            and <span className='text-green-400'>secure </span>
            messenger
          </div>
        </div>
      </div>

      {/* bottom left */}
      <div className='absolute bottom-0 left-0 flex flex-col py-12 px-14'>
        <h1 className='uppercase text-sm tracking-wide'>The best app for your productivity</h1>
        <p className=' w-68 text-[2.7rem] tracking leading-10 text-white/90 font-bold'>
          connect with
          <span className='text-green-400/90'> your friends </span>
          easily
        </p>
      </div>
    </>
  )
}