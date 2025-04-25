
import { User, MessageCircleMore } from 'lucide-react'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-neutral-950 text-neutral-50/90 relative'>
      <Navbar />
      <Main />
      <Texts />

    </div>
  )
}

export default App



function Navbar() {
  return (
    <nav className='px-4 md:px-12 flex items-center justify-between h-20  '>
      <h1 className='text-2xl font-medium tracking-wide'>mono<span className='text-green-400/90'>chat</span></h1>
      <div className='gap-4 hidden sm:flex text-lg text-slate-50/95 relative left-10'>
        <a href='#' className='px-4'>product</a>
        <a href='#' className='px-4'>pricing</a>
        <a href='#' className='px-4'>contacts</a>
      </div>

      <div className='gap-3 flex'>
        <button className='py-1.5 px-5 rounded-4xl border border-neutral-50 text-neutral-50 uppercase font-medium'> Signup</button>
        <button className='py-1.5 px-5 rounded-4xl border bg-neutral-50 text-neutral-950 uppercase font-medium'> Login</button>
      </div>
    </nav>
  )
}

function Main() {
  return (
    <div className='w-[60rem] mx-auto '>
      {/* blocks-1 */}
      <div className='flex gap-4 items-end'>
        {/* sq. blue box */}
        <div className='bg-blue-400/90 text-black rounded-4xl px-5 py-4 size-40 flex flex-col justify-between'>
          <div>
            <p className='text-lg tracking-tight'>messages</p>
            <p className='text-3xl font-semibold'>12</p>
          </div>
          <div className='flex justify-between items-center'>
            <User />
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
        <div className='bg-lime-300 rounded-full px-3 py-4 w-64 h-16 flex items-center justify-between'>
          <div className="avatar size-11 rounded-full">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className='bg-text font-semibold tracking-tight text-black/90 text-lg'>
            Jacob Simmons
          </div>
          <div className='size-6 rounded-full bg-black grid place-items-center '>
            <p className='text-sm'>17</p>
          </div>

        </div>
      </div>

      {/* block-2 */}
      <div className='flex gap-4 mt-5 relative -left-24'>
        <div className='bg-red-400/95 size-20 rounded-full flex items-center justify-center'>
          <MessageCircleMore color="oklch(70.4% 0.191 22.216)" fill='black' className='size-16' />
        </div>

        <div className='bg-neutral-800 rounded-2xl px-5 py-3 w-[22rem] flex justify-between'>
          <div className="avatar size-12 rounded-full top-1">
            <div className="w-24 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className='flex flex-col text-white/90 absolute top-4 left-43'>
            <h1 className='text-md tracking-wide'>Theresa Peterson</h1>
            <p className='text-sm text-white/80'>Yep, I have a new concept for tomorrow 👍</p>

          </div>

          <div className='size-5 rounded-full bg-green-400 '>
            <p className='text-black text-sm text-center'>4</p>
          </div>
        </div>
      </div>

      


    </div>
  )
}


function Texts() {
  return (
    <>
      {/* top-left */}

      <div className='w-56 text-2xl leading-6 text-white/90 absolute top-56 right-5 p-12'>
        fast, reliable
        and <span className='text-green-400'>secure </span>
        messenger
      </div>



      {/* bottom left */}
      <div className='absolute bottom-0 left-0 flex flex-col p-12'>
        <h1 className='uppercase text-sm'>The best app for your productivity</h1>
        <p className=' w-64 text-[2.7rem] tracking-tight leading-10 text-white/90'>
          connect with
          <span className='text-green-400/90'> your friends </span>
          easily
        </p>

      </div>

    </>
  )
}