import AsyncComponent from '../components/AsyncComponent';

const Home = AsyncComponent(()=>import('../pages/Home/index'));
const NotFound = AsyncComponent(()=>import('../pages/NotFound/index'));

export default [
    {path: '/', exact:true, component: Home},
    {path: '*', component:NotFound}
]