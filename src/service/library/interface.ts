export interface ILibaryService {
  getRecentAlbum: (request: any) => Promise<any>;
  addAlbumHistory: (request: any, albumId: string) => Promise<any>;
  likeSong: (request: any, songId: string) => Promise<any>;
  likeAlbum: (request: any, albumId: string) => Promise<any>;
  likeArtist: (request: any, artistId: string) => Promise<any>;
  get: (request: any) => Promise<any>;
  createNew: (userId: any) => Promise<any>;
  playingNewPlaylist: (request: any, albumId: string) => Promise<any>;
  getPlaylist: (request: any) => Promise<any>;
  createPlaylist: (request: any, param: any) => Promise<any>;
  addToPlayingList: (request: any, songId: any) => Promise<any>;
  removeSongOutOfPlayingList: (request: any, songId: any) => Promise<any>;
  getOwnPlaylist: (request: any) => Promise<any>;
  addSongToPlaylist: (songId: any, playlistId: any) => Promise<any>;
  removeSongOutOfPlaylist: (songId: any, playlistId: any) => Promise<any>;
  removePlaylist: (request: any, playlistId: any) => Promise<any>;
}
