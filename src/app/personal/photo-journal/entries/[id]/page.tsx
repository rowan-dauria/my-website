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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Slideshow publicIds={entryImagePublicIDs} />
            <div className="mt-8 max-w-4xl mx-auto px-4">
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {journalEntry.content}
                    </p>
                </div>
            </div>
        </div>
    )
}