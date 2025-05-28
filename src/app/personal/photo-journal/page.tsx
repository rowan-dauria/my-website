import CloudinaryImage from "./CloudinaryImage"

type JournalEntryData = {
    photos: Array<{ id: string, author: string, url: string }>,
    description: string,
    createdDate: string,
    location: string,
}


// some dummy data to test the journal entry component
const journalEntries: JournalEntryData[] = [
    {
        photos: [{ id: 'example-folder/jdvv5lazeezq7zpskiaa', author: 'Author 1', url: '' }],
        description: 'This is the first journal entry.',
        createdDate: '2023-01-01',
        location: 'Location 1',
    },
    {
        photos: [{ id: 'example-folder/dkeyimkziigjsobkjypa', author: 'Author 2', url: '' }],
        description: 'This is the second journal entry.',
        createdDate: '2023-02-01',
        location: 'Location 2',
    },
    {
        photos: [{ id: 'example-folder/u4u9wuny1klxen5rr4tm', author: 'Author 3', url: '' }],
        description: 'This is the third journal entry.',
        createdDate: '2023-03-01',
        location: 'Location 3',
    },
    {
        photos: [{ id: 'venice-2024/l9iqs2rwv91zxns9bmax', author: 'Author 4', url: '' }],
        description: 'This is the fourth journal entry.',
        createdDate: '2023-04-01',
        location: 'Location 4',
    },
]

// could do a photo grid layout? with each photo clickable to display the journal entry

export default function JournalPage() {
    const JournalEntryComps = journalEntries.map((entry) => {
        return (
            <JournalEntry key={entry.createdDate} imageID={entry.photos[0].id} />
        )
    })
    return (
        <>
            <Header />
            <main className="
                flex
                flex-wrap
                items-start
                justify-start
                gap-2
                mx-auto
                max-w-screen-lg

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

function JournalEntry({ imageID }: { imageID: string }) {
    return (
        <div className="
            w-32 h-32 p-1
            sm:w-48 sm:h-48 sm:p-2
            md:w-64 md:h-64 md:p-2
        ">
            <div className="
                w-full
                h-full
                flex
                items-center
                justify-center
                overflow-hidden
            ">
                <CloudinaryImage
                    src={imageID}
                    alt="Image description"
                    height={500}
                    width={500}
                />
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