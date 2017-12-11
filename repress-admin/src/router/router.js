import Home from '../pages/Main/index'
import NotFound from '../pages/NotFound/index'

export default [
    {path: '/', exact:true, component: Home},
    {path: '*', component:NotFound}
]