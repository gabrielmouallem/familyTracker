export interface Profile {
    _id: string;
    name: string;
    age: number;
    email: string;
    password: string;
    family: Family;
}

export interface Position {
    _id: string;
    profile: string;
    location: {
      coordinates: number[]; // [latitude, longitude]
      _id: string;
    }
}

export interface Family {
    _id: string;
    surname: string;
}