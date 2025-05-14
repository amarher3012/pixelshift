import Upload from '../features/Upload'
import '../features/Auth.css'

export default function Home() {
    return (
        <div className="flex flex-col justify-center-safe lg:w-2/4 sm:w-3/4  mx-auto my-auto p-4">
            <div className="flex flex-col justify-center gap-5 p-4 rounded-2xl">
                <h1 className="text-center text-4xl text-shadow-neutral-800 text-shadow-lg">
                    PixelShift
                </h1>
                <p className="text-shadow-neutral-800 text-shadow-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Temporibus expedita facere sint cumque itaque maxime minus
                    voluptatum nulla voluptates. At praesentium dolor ex quae
                    sapiente maxime numquam eaque. Numquam, minima.
                </p>
            </div>
            <Upload />
        </div>
    )
}
