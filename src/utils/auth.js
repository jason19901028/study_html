import Cookies from 'js-cookie'

const TokenKey = 'token'
const TagKey = 'tag'
const VideoKey = 'videoId'
const ExamKey = 'examId'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getTag () {
  return Cookies.get(TagKey)
}

export function setTag (tag) {
  return Cookies.set(TagKey, tag)
}

export function setVideo (videoId) {
  return Cookies.set(VideoKey, videoId)
}

export function getVideo () {
  return Cookies.get(VideoKey)
}

export function setExam (examId) {
  return Cookies.set(ExamKey, examId)
}

export function getExam () {
  return Cookies.get(ExamKey)
}
