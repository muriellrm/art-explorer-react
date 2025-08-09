export interface Department {
  departmentId: number;
  displayName: string;
}

export interface Departments {
  departments: Department[];
}

export interface SearchArtworks {
  total: number;
  objectIDs: number[] | null;
  artworks?: Artwork[];
}

export interface Artwork {
  objectID: number;
  primaryImage: string;
  primaryImageSmall: string;
  department: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
}
