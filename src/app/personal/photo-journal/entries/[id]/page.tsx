import { fetchJournalEntries } from "@/utils/supabase"
import { fetchEntryImagePublicIDs } from "@/utils/cloudinary"
import { notFound } from "next/navigation"
import Slideshow from "./slideshow"

export default async function journalEntry({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const journalEntries = await fetchJournalEntries()
    const journalEntry = journalEntries.find(entry => entry.id.toString() === id)
    if (!journalEntry) {
        notFound()
    }
    const entryImagePublicIDs = await fetchEntryImagePublicIDs(journalEntry.folder)
    if (!entryImagePublicIDs || entryImagePublicIDs.length === 0) {
        console.error(`No images found for journal entry with ID: ${id}`)
        notFound()
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Slideshow publicIds={entryImagePublicIDs} />
        </div>
    )
}