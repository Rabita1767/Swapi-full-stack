export interface ApiResponse  {
    success: boolean;
    data: any;
    message?: string;
    error?: any;
    cached?: boolean;
  }
  export interface ICharacterProperties {
    created: string;
    edited: string;
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
    birth_year: string;
    url: string;
}

export interface ICharacterDetails {
    properties: ICharacterProperties;
    _id: string;
    description: string;
    uid: string;
    __v: number;
}

export interface ICharacter {
    uid: string;
    name: string;
    url: string;
    details: ICharacterDetails;
}

export interface ICharactersData {
    totalCharacters: number;
    totalPages: number;
    currentPage: number;
    characters: ICharacter[];
  }
  
  export interface ICharactersResponse {
    success: boolean;
    message: string;
    cached: boolean;
    data: ICharactersData;
    error: any;
  }