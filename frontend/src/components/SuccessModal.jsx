
const SuccessModal = ({ children, visibility, returnToHome, setVisibility, message }) => {
    const buttonClicked = () => {
        setVisibility(false)
        returnToHome();
    }

    return (

        <div className={`${visibility ? 'fixed' : 'hidden'} 
                        w-screen h-screen top-0 left-0 flex 
                        items-center justify-center bg-[rgba(0,0,0,0.5)]`}>
            <div className="bg-lighter-bg z-50 rounded-3xl grid
                            items-center place-items-center
                            max-w-[25rem] md:max-w-[30rem]
                            w-full
                            px-10 
                            py-10 sm:py-14
                            mx-4
                            gap-y-4">
                {children}
                <p className="text-center font-semibold
                              text-lg sm:text-xl md:text-2xl ">{message}</p>
                <button className="bg-accent font-extrabold rounded-full 
                                text-white 
                                w-full
                                text-xl md:text-2xl
                                px-4 
                                py-2 
                                mt-4" onClick={buttonClicked}>Confirm</button>
            </div>
        </div >
    )
}

export default SuccessModal;