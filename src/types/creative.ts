export type CreativeType = 'photo_album' | 'mix' | 'design' | 'writing';

export type CreativeBase = {
  id: string;
  type: CreativeType;
  title: string;
  cover?: string;
  tags?: string[];
  description?: string;
};

export type PhotoItem = {
  src: string;
  alt: string;
  camera?: string;
  stock?: string;
  location?: string;
  date?: string; // ISO
};

export type PhotoAlbum = CreativeBase & {
  type: 'photo_album';
  items: PhotoItem[];
};

export type Mix = CreativeBase & {
  type: 'mix';
  audio: { src?: string; external?: string; duration?: number };
};

export type Design = CreativeBase & {
  type: 'design';
  images: string[];
};

export type Writing = CreativeBase & {
  type: 'writing';
  url: string;
};

export type CreativeEntry = PhotoAlbum | Mix | Design | Writing;
