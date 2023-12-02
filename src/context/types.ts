export interface Movie {
    id: string;
    title: string,
    synopsis: string;
    heroes: Character[];
    villains: Character[];
    cameos: Character[];
    status: "SAVED" | "DRAFT"
}

export interface Character {
    id: string;
    name: string;
    portrait: string;
}