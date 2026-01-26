import { atom, type Store } from "nanostores"
import type { AuthUser } from "@auth/types"

export const darkmode: Store = atom(false)
export const language: Store = atom("EN")

// Auth state
export const isAuthenticated: Store = atom(false)
export const authUser: Store<AuthUser | null> = atom(null)
export const authLoading: Store = atom(false)
export const authError: Store<string | null> = atom(null)
