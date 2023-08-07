
const SubmitModal = ({ display, closeModal, id }) => {

    return (
        <div className={`h-screen w-screen fixed ${display ? 'flex' : 'hidden'} 
                        top-0 left-0 items-center justify-center 
                        px-4 z-50
                        bg-[rgba(0,0,0,0.5)]`}>
            <div className="bg-lighter-bg z-10 grid items-center place-items-center 
                            px-6 sm:px-12
                            py-8 sm:p-12
                            w-full sm:w-auto
                            max-w-[25rem] sm:max-w-none
                            gap-2 lg:gap-4
                            rounded-2xl">
                <h2 className="font-semibold text-center
                               text-sm sm:text-lg">Your entry has been submitted!</h2>
                <h3 className="font-bold text-center
                               text-md sm:text-2xl lg:text-3xl font-heading">ID: {" "}
                    <span className="break-all font-heading">{id}</span>
                </h3>
                <p className="text-center
                              max-w-[40ch]
                              text-sm sm:text-lg">Keep this ID to keep track to your entry and do not share this information with anyone.</p>
                <button className="bg-accent text-text w-full font-bold
                                     py-2 lg:py-3
                                     rounded-full 
                                     mt-6  
                                     text-xl sm:text-2xl lg:text-2xl"
                    onClick={closeModal}>Confirm</button>
            </div>
        </div >
    )
}

export default SubmitModal;