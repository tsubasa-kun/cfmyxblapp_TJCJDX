import index from './pages/index/index.vue';
import uploadPage from './pages/uploadPage/uploadPage.vue';
import noInfoPage from './pages/noInfoPage/noInfoPage.vue';

export default {
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/uploadPage',
            component: uploadPage
        },
        {
            path: '/noInfoPage',
            component: noInfoPage
        }
    ]
};