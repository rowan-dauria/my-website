import Image from 'next/image'

type JournalEntryData = {
    photos: Array<{ id: string, author: string, url: string }>,
    description: string,
    createdDate: string,
    location: string,
}

const randID = () => Math.floor(Math.random() * 1000)

// some dummy data to test the journal entry component
const journalEntries: JournalEntryData[] = [
    {
        photos: [{ id: '1', author: 'Author 1', url: 'https://picsum.photos/id/1/200/300' }],
        description: 'This is the first journal entry.',
        createdDate: '2023-01-01',
        location: 'Location 1',
    },
    {
        photos: [{ id: '2', author: 'Author 2', url: 'https://picsum.photos/id/2/200/300' }],
        description: 'This is the second journal entry.',
        createdDate: '2023-02-01',
        location: 'Location 2',
    },
    {
        photos: [{ id: '3', author: 'Author 3', url: 'https://picsum.photos/id/3/200/300' }],
        description: 'This is the third journal entry.',
        createdDate: '2023-03-01',
        location: 'Location 3',
    },
    {
        photos: [{ id: '4', author: 'Author 4', url: 'https://picsum.photos/id/4/200/300' }],
        description: 'This is the fourth journal entry.',
        createdDate: '2023-04-01',
        location: 'Location 4',
    },
]

// could do a photo grid layout? with each photo clickable to display the journal entry

export default function JournalPage() {
    const JournalEntryComps = journalEntries.map((entry) => {
        return (
            <JournalEntry key={entry.createdDate} />
        )
    })
    return (
        <>
            <Header />
            <main className="
            flex
            flex-col
            items-center
            justify-center
            w-full
        ">
                {JournalEntryComps}
            </main>
        </>
    )
}

function Header() {
    return (
        <header className="flex flex-row items-center justify-center m-2">
            <h1>Journal Page</h1>
        </header>
    )
}

function JournalEntry() {
    return (
        <div className="
            w-full
            py-2
            px-4
        ">
            <div className="
                w-full
                flex
                flex-row
                items-center
                justify-left
                border-2
                border-[color:var(--foreground)]
            ">
                <Image
                    src={`https://picsum.photos/id/${randID()}/500/300`}
                    alt="random image"
                    height={300}
                    width={500}
                    className="m-2"
                />
                <div className="m-2">
                    <h2>Journal Entry</h2>
                    <p>This is a journal entry.</p>
                </div>
            </div>
        </div>

    )
}
// // Built-in next js functionality for static site generation
// // This function will run at build time
// export const getStaticProps: GetStaticProps = async () => {
//     const data = await fetch('https://picsum.photos/v2/list?limit=10')
//     const photos = await data.json()
//     return {
//         props: { photos }, // will be passed to the page component as props
//         revalidate: 60 * 60 * 10, // 10 mins in seconds
//     }
// }