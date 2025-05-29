import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
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

export default createClient(supabaseUrl, supabaseAnonKey)
