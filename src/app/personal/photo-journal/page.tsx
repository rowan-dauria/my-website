export default function JournalPage() {
    return(
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Journal Page</h1>
            <p className="journal-page__description">This is a journal page.</p>
            <JournalEntry />
        </div>
    )
}

function JournalEntry() {
    return(
        <div className="flex flex-row items-center justify-center w-full h-full">
            <h2>Journal Entry</h2>
            <p>This is a journal entry.</p>
        </div>
    )
}