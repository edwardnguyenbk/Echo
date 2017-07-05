import axios from 'axios';
import * as types from '../constant/action_constant';
import { MEDIA_ENDPOINT } from '../constant/endpoint_constant';
import { pageQuery } from '../utils/query';

export function clearAlbums() {
  return {
    type: types.CLEAR_ALBUMS,
  };
}

export function setNumberOfPages(numberOfPages) {
  return {
    type: types.SET_NUMBER_OF_PAGES,
    numberOfPages,
  };
}

export function changePageChunkIndex(pageChunkIndex) {
  return {
    type: types.CHANGE_PAGE_CHUNK_INDEX,
    pageChunkIndex,
  };
}

export function fetchDefaultAlbums() {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/album/default`)
      .then(({ data }) => {
        if (data.result && data.origins.length) {
          dispatch({ type: types.FETCH_DEFAULT_ALBUMS, defaultAlbums: data.origins });

          dispatch(clearAlbums()); // clear the albums data
        }
      })
      .catch(err => {
        throw err;
      });
  };
}

export function fetchAlbums(genre, id, page) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/albums?genre=${genre}&id=${id}${pageQuery(page)}`)
      .then(({ data }) => {
        if (data.albums && data.albums.length) {
          dispatch({ type: types.FETCH_ALBUMS, albums: data.albums });

          dispatch(setNumberOfPages(data.numberOfPages));
        }
      })
      .catch(err => { throw err; });
  };
}

export function fetchAlbumPlaylist(title, id) {
  return dispatch => {
    axios.get(`${MEDIA_ENDPOINT}/album_playlist?title=${title}&id=${id}`)
      .then(({ data }) => {
        dispatch({ type: types.FETCH_ALBUM_PLAYLIST, playlist: data });
      })
      .catch(err => { throw err; });
  };
}

export function clearPlaylist() {
  return { type: types.CLEAR_PLAYLIST };
}

