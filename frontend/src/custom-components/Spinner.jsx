import { HashLoader } from "react-spinners"

const Spinner = () => {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center'>
            <div className="relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl scale-150 animate-pulse"></div>
                {/* Main loader */}
                <HashLoader size={130} color='#8B5CF6' />
            </div>
        </div>
    )
}

export default Spinner