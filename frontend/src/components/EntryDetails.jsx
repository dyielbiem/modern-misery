
const EntryDetails = ({ entry }) => {
    return (
        <>
            <h2 className="text-primary sm:max-w-[40ch] font-semibold
                           break-words sm:break-normal
                           text-xl sm:text-2xl
                           font-heading">{entry.title}</h2>
            <p className="font-semibold max-w-[70ch]
                          text-base md:text-lg whitespace-pre-wrap
                          mt-2">{entry.body}</p>
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
                                   bg-lighter-bg text-accent font-heading
                                   border-accent border-2
                                   py-2 sm:py-2 
                                   px-3 sm:px-4
                                   text-base sm:text-lg"
                        key={index}>{tag}</li>
                ))}
            </ul>
        </>
    )
}

export default EntryDetails;