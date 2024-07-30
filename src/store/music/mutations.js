export function someMutation (/* state */) {
}

export function setSongInfo (state, payload) {
  state.songInfo = payload
}

export function playSong (state) {
  state.isPlaying = true
}

export function isPlayingToggle (state) {
  state.isPlaying = !state.isPlaying
}

export function setPlayList (state, payload) {
  state.playList.push(payload)
}

export function addSongToThePlayList (state, payload) {
  const { item, play } = payload
  const found = state.playList.find(song => song.id === play.id)
  if (found) {
    found.songs.push(item)
  }
}

export function deletePlayList (state, payload) {
  const newList = state.playList.filter(song => song.id !== payload)
  state.playList = newList
}
