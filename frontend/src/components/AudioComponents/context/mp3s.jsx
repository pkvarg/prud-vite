import axios from 'axios'

export let wordsOflife = []
export let lifeStudy = []
export const myList = async () => {
  const { data } = await axios.get(`/api/audio`)
  // Words of life
  const audios = data.audios
  audios.map((audio) => {
    if (audio.category === 'Slová života') {
      return wordsOflife.push(audio)
    } else {
      return lifeStudy.push(audio)
    }
    return wordsOflife.push(audio)
  })
}

myList()
