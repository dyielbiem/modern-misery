import EntryForm from "./EntryForm";
import SuccessModal from "./SuccessModal";
import { BsFillPatchCheckFill } from "react-icons/bs"
import { useState } from "react";

const UpdatedEntry = ({ getUpdatedEntry, setFormVisibility, formVisibility }) => {

    const [successModalVisibility, setSuccessModalVisibility] = useState(false);

    return (
        <>
            <EntryForm buttonText={"Update"} type={"UPDATE"} formHeader={"Update Your Entry"}
                getUpdatedEntry={getUpdatedEntry} visibility={formVisibility}
                setVisibility={setFormVisibility}
                setSuccessModalVisibility={setSuccessModalVisibility}></EntryForm>
            <SuccessModal visibility={successModalVisibility}
                setVisibility={setSuccessModalVisibility}
                returnToHome={() => { return }}
                message={"Your entry has been updated"}>
                <BsFillPatchCheckFill className="text-5xl sm:text-6xl" />
            </SuccessModal>
        </>
    )
}

export default UpdatedEntry;