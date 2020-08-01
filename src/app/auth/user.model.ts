class Location{
  lat: string | number;
  lng: string | number;
}

export class User{
  uid: string;
  email: string;
  country?: string;
  gender?: string;
  photoURL?: string;
  displayName?: string;
  shortDescription?: string;
  location?: Location;
  upiAddress?: string;
  reputation?: number;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;

  constructor(fields?: Partial<User>){
    if(fields)Object.assign(this, fields);
  }
}
