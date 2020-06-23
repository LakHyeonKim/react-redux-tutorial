import * as postsAPI from '../api/posts' // api/posts 안의 함수 모두 불러오기
import {
    reducerUtils,
    handleAsyncActions,
    handleAsyncActionsById,
    createPromiseSaga,
    createPromiseSagaById,
} from '../lib/asyncUtils'
import { takeEvery } from 'redux-saga/effects'

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS' // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS' // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR' // 요청 실패

// 포스트 하나 조회하기
const GET_POST = 'GET_POST'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_ERROR = 'GET_POST_ERROR'

export const getPosts = () => ({ type: GET_POSTS })
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id })

// 반복되는 코드를 createPromiseSaga() 함수로 리팩토링
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts)
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById)

// 사가 합치기
export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga)
    yield takeEvery(GET_POST, getPostSaga)
}

// 반복되는 코드를 initial() 함수로 리팩토링
const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial(),
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts', true)(state, action)
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActionsById(GET_POST, 'post', true)(state, action)
        default:
            return state
    }
}