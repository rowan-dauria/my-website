import CloudinaryImage from "./CloudinaryImage"
import supabase from "@/utils/supabase"
import cloudinary from "@/utils/cloudinary"

type JournalEntryData = {
    id: number,
    title: string,
    content: string,
    created_at: string,
    folder: string,
}


async function fetchJournalEntries(): Promise<JournalEntryData[]> {
    const { data, error } = await supabase
        .from<string, JournalEntryData>("journal_entries")
        .select("*")

    if (error) {
        console.error('Error fetching journal entries:', error)
        return []
    }

    return (data)
}

async function fetchThumbnailPublicIDs(): Promise<{ [key: string]: string }> {
    const resources = await cloudinary.api.resources_by_tag("thumbnail")
    const thumbnailPublicIDs: { [key: string]: string } = {}
    resources.resources.forEach((resource) => {
        // assumes asset folder is the same as cloudinary_tag
        if (!resource.asset_folder) {
            console.error(`Resource ${resource.public_id} does not have an asset folder`)
            return
        }
        thumbnailPublicIDs[resource.asset_folder] = resource.public_id
    })
    return thumbnailPublicIDs
}




export default async function JournalPage() {
    const journalEntries = await fetchJournalEntries()
    if (!journalEntries || journalEntries.length === 0) {
        return (
            <>
                <Header />
                <main className="flex items-center justify-center h-screen">
                    <p>No journal entries found.</p>
                </main>
            </>
        )
    }
    // Fetch thumbnail URLs from Cloudinary
    const thumbnailPublicIDs = await fetchThumbnailPublicIDs()
    if (!thumbnailPublicIDs || Object.keys(thumbnailPublicIDs).length === 0) {
        console.error('No thumbnail URLs found')
    }
    // map the journal entries to components
    const JournalEntryComps = journalEntries.map((entry) => {
        const thumbnailPublicID = thumbnailPublicIDs[entry.folder]
        if (!thumbnailPublicID) { console.error(`No thumbnail URL found for asset folder: ${entry.folder}`) }
        return (
            <JournalEntry key={entry.created_at} thumbnailPublicID={thumbnailPublicID} />
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

function JournalEntry({ thumbnailPublicID }: { thumbnailPublicID: string }) {
    return (
        <div className="
            w-32 h-32 p-1
            sm:w-48 sm:h-48 sm:p-2
            md:w-64 md:h-64 md:p-2
        ">
            <div
                className="
                w-full
                h-full
                flex
                items-center
                justify-center
                overflow-hidden
            ">
                <CloudinaryImage
                    src={thumbnailPublicID}
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