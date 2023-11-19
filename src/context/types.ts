export type Movie = {
    id: string;
    title: string,
    synopsis: string;
    heroes: Character[];
    villains: Character[];
    cameos: Character[];
    status: "SAVED" | "DRAFT"
}

export type Character = {
    name: string;
    portrait: string;
}