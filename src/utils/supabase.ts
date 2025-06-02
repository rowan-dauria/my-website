import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { cache } from 'react'
// Load environment variables from .env file
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    throw new Error('Missing Supabase environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
    throw new Error('Missing Supabase environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

type JournalEntryData = {
    id: number,
    title: string,
    content: string,
    created_at: string,
    folder: string,
}


const fetchJournalEntries = cache(async (): Promise<JournalEntryData[]> => {
    const { data, error } = await supabase
        .from<string, JournalEntryData>("journal_entries")
        .select("*")

    if (error) {
        console.error('Error fetching journal entries:', error)
        return []
    }

    return (data ?? [])
})

export {
    fetchJournalEntries,
}

export type {
    JournalEntryData,
}