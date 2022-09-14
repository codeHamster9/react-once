interface IUserName {
  first: string;
  last: string;
}

interface IUserPicture {
  medium: string;
  large: string;
}

export interface IUser {
  picture: IUserPicture;
  name: IUserName;
}

type Sprites = {
  front_default: string;
};

export interface Pokemon {
  name: string;
  sprites: Sprites;
}
