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
    id: number;
    name: string;
    portrait: string;
}