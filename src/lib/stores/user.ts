import type { UserRecord } from 'firebase-admin/auth';
import type { User } from 'firebase/auth';
import { writable } from 'svelte/store';

export const user = writable<User | UserRecord | null>(null);
