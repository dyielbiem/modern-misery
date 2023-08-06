
const EntryDetails = ({ entry }) => {
    return (
        <>
            <h2 className="font-bold text-primary sm:max-w-[40ch]
                           break-words sm:break-normal
                           text-xl sm:text-2xl">{entry.title}</h2>
            <p className="font-medium max-w-[70ch]
                          text-base md:text-lg
                          mt-4">{entry.body}</p>
            <div className="flex 
                            flex-col 
                            items-left 
                            my-4">
                <h3 className="text-base md:text-lg
                               break-all sm:break-normal">@{entry.name} </h3>
                <span className="hidden">•</span>
                <p className="text-base md:text-lg
                              break-all
                              ">{entry.submittedDate}</p>
            </div>
            <ul className="flex flex-wrap
                           gap-3">
                {entry.tags && entry.tags.map((tag, index) => (
                    <li className="rounded-full font-semibold break-all
                                   bg-lighter-bg text-accent
                                   border-accent border-2
                                   py-1 sm:py-2 
                                   px-3 sm:px-4
                                   text-base sm:text-lg"
                        key={index}>{tag}</li>
                ))}
            </ul>
        </>
    )
}

export default EntryDetails;