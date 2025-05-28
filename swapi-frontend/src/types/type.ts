export interface ICharacterDetailsProperties {
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
    properties: ICharacterDetailsProperties;
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
  
  export interface CharacterResponse {
    results: ICharacter[];
  }

  export interface CharacterProperties {
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
  
  export interface CharacterResult {
    properties: CharacterProperties;
    _id: string;
    description: string;
    uid: string;
    __v: number;
  }