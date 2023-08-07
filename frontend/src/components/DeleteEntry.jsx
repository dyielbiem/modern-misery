
import { PiSealWarningFill } from 'react-icons/pi'
import { IoCloseSharp } from 'react-icons/io5'
import { useParams, useNavigate } from 'react-router-dom';
import { handleDelete } from '../utils/HandleDelete';
import { useRef, useState, useEffect } from 'react';
import { useEntryContext } from "../hooks/useEntryContext";
import SuccessModal from './SuccessModal';
import { FaTrashAlt } from 'react-icons/fa'



const DeleteEntry = ({ visibility, setShowDelete }) => {
    const params = useParams();
    const confirmRef = useRef(null);
    const { entries, dispatch } = useEntryContext();
    const navigate = useNavigate();
    const [modalVisibility, setModalVisibility] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleButtonClick = () => {
        const parameter = {
            input: confirmRef.current.value,
            entries,
            dispatch,
            params,
            setModalVisibility
        }

        handleDelete(parameter);
        confirmRef.current.value = "";
        setShowDelete(false);
    }

    const returnToHome = () => {
        navigate('/');
    }

    useEffect(() => {
        if (inputValue === "confirm") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [inputValue])

    return (
        <>
            <div className={`${visibility ? 'fixed' : 'hidden'} 
                            w-screen h-screen top-0 left-0 flex z-50 
                            items-center justify-center bg-[rgba(0,0,0,0.5)]`}>
                <div className='bg-lighter-bg rounded-2xl flex flex-col 
                                items-center justify-center
                                mx-4 max-w-xl
                                p-6 sm:p-12
                                gap-y-2 sm:gap-y-3'>
                    <IoCloseSharp className='self-end bg-secondary rounded-full p-2
                                            text-4xl'
                        onClick={() => setShowDelete(false)} />
                    <PiSealWarningFill className='fill-red-800
                                                  text-7xl lg:text-8xl' />
                    <h2 className='font-extrabold text-red-800 text-center font-heading
                                   text-2xl sm:text-3xl lg:text-4xl'>Confirm Delete</h2>
                    <div className='grid text-center
                                    text-base md:text-lg
                                    gap-y-2 sm:gap-y-3'>
                        <p className='max-w-[55ch]'>Please type "confirm" in the field below to complete
                            the deletion of your entry {' '}
                            <span className='font-bold font-heading'>
                                ID: <span className=' break-all font-heading'>{params.id}</span>
                            </span>
                        </p>
                        <input type="text" placeholder='type confirm' ref={confirmRef}
                            className='w-full bg-text
                                     border-red-700 outline-none
                                       py-1 
                                       px-2 
                                       text-base md:text-lg
                                       border-2'

                            onChange={(event) => setInputValue(event.target.value)} />
                    </div>
                    <button className='bg-red-800 text-text w-full
                                        disabled:hover:bg-red-800 hover:hover:bg-red-700
                                        font-bold rounded-full
                                        text-lg md:text-xl
                                        px-4 
                                        py-3 
                                        mt-4 sm:mt-6
                                        disabled:opacity-60 disabled:cursor-not-allowed'
                        onClick={handleButtonClick} disabled={isButtonDisabled}>Delete
                    </button>
                </div>
            </div>
            <SuccessModal visibility={modalVisibility}
                setVisibility={setModalVisibility}
                returnToHome={returnToHome}
                message={"Your entry has been deleted"}>
                <FaTrashAlt className="text-7xl" />
            </SuccessModal>
        </>

    )
}

export default DeleteEntry;