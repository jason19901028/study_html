import ajax from './axios'
// 首页
export const home = () => {
  return ajax.get('/app/home')
}

// 试卷列表
export const exam = (curriculumId) => {
  return ajax.get(`/app/exam/paper/list?curriculumId=${curriculumId}`)
}

// 试卷
export const examTest = (examPaperId, code) => {
  return ajax.get(`/app/exam/paper/answer?id=${examPaperId}&code=${code}`)
}

// 保存学生信息
export const saveStudent = (params) => {
  return ajax.post('/app/student', params)
}

// 提交测试
export const submitTest = (params) => {
  return ajax.post('app/answer', params)
}

// 视频列表
export const videoList = (curriculumId) => {
  return ajax.get(`/app/video/list?curriculumId=${curriculumId}`)
}

// 视频详情
export const videoDetail = (id, code) => {
  return ajax.get(`/app/video/detail?id=${id}&code=${code}`)
}

// 历史测试
export const historyTest = (studentId) => {
  return ajax.get(`/app/history/list?studentId=${studentId}`)
}

// 错题库
export const errorList = (studentId) => {
  return ajax.get(`/app/exam/questions/error/list?studentId=${studentId}`)
}

// 获取用户授权
export const studentAuth = (code) => {
  return ajax.get(`app/student/auth/code?code=${code}`)
}

// 获取用户信息
export const studentInfo = (studentId) => {
  return ajax.get(`/app/student/login?studentId=${studentId}`)
}

// 收藏
export const storeInfo = (studentId) => {
  return ajax.get(`/app/store/list?studentId=${studentId}`)
}
