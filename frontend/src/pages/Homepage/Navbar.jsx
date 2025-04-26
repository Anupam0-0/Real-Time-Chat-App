import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ChevronDown, ChevronUp } from 'lucide-react'

const color = [
    'bg-green-300',
    'bg-sky-300',
    'bg-rose-300',
    'bg-amber-200',
    'bg-violet-300',
    'bg-teal-300',
    'bg-emerald-300',
    'bg-lime-300',
    'bg-pink-300',
    'bg-purple-300',
]

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    return (
        <nav className={`px-4 md:px-12 relative z-20 ${isOpen ? `bg-neutral-900 hover:shadow-xl/30 ` : ``}`}>
            <div className="h-22 flex items-center justify-between">
                <h1 className='text-2xl font-medium tracking-wide group-hover:text-neutral-900'>mono<span className='text-green-400/90'>chat</span></h1>
                <div className='gap-6 hidden sm:flex text-md text-slate-50/90 relative left-10 capitalize'>
                    <button onMouseOver={() => setIsOpen(true)} onClick={() => setIsOpen(!isOpen)} className='px-4 cursor-pointer flex items-center gap-1'>Features <span className='relative top-[1px]'>{ !isOpen ? <ChevronDown size={20}/> : <ChevronUp size={20}/>}</span> </button>
                    <button onClick={() => toast("It's free to use 😇", {style: {width: "50rem", height:"4rem"}})} className='px-4 cursor-pointer'>Pricing</button>
                    <a href='/contact' className='px-4 cursor-pointer'>Help Center</a>
                    <a href='/contact' className='px-4 cursor-pointer'>Contact</a>
                </div>

                <div className='gap-3 flex '>
                    <a href='/signup' className='py-1.5 px-5 rounded-4xl border-[2.2px] border-neutral-50/80 text-neutral-50 uppercase font-medium cursor-pointer'> Signup</a>
                    <a href='/login' className='py-1.5 px-5 rounded-4xl border-[2.2px] border-neutral-50/80 bg-neutral-50 text-neutral-950 uppercase font-medium cursor-pointer'> Login</a>
                </div>
            </div>

            <div onMouseLeave={()=>setIsOpen(false)} className={`${isOpen ? `block  bg-neutral-900` : `hidden bg-transparent`} h-[16rem] w-full`}>
                <FullBlocks />
            </div>
        </nav>
    )
}

export default Navbar


function FullBlocks(){

    const [hover, setHover] = useState(false)

    return(
        <div className='w-full hide-scrollbar flex flex-between overflow-x-auto gap-8 pt-3'>
            {
                Array.from({length:5}).map((_,i)=>(
                    <div 
                        key={i} 
                        onMouseOver={() => setHover(i)} 
                        onMouseLeave={() => setHover(false)} 
                        className={`min-w-[15rem] h-55 rounded-4xl border border-white flex-1 hover:border-black transition ease-in-out duration-150 ${hover === i ? color[Math.floor(Math.random() * color.length)] : 'bg-transparent'}`}
                    >
                    </div>
                ))
            }
        </div>
    )
}