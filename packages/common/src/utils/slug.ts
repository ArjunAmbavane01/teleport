import slug from 'slug'
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

const generateArenaSlug = (name: string): string => {
    let arenaslug = slug(name, { lower: true, trim: true, fallback: true })
    return `${arenaslug}-${nanoid()}`
}

export default generateArenaSlug;
