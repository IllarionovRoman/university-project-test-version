import { Container } from 'react-bootstrap'
import { BrowserRouter  as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import StudentEditScreen from './screens/StudentEditScreen'
import StudentListScreen from './screens/StudentListScreen'
import StudentScreen from './screens/StudentScreen'
import DepartmentEditScreen from './screens/DepartmentEditScreen'
import DepartmentListScreen from './screens/DepartmentListScreen'
import SectionEditScreen from './screens/SectionEditScreen'
import SectionListScreen from './screens/SectionListScreen'
import DepartmentScreen from './screens/DepartmentScreen'
import TrainerListScreen from './screens/TrainerListScreen'
import TrainerEditScreen from './screens/TrainerEditScreen'
import AwardEditScreen from './screens/AwardEditScreen'
import AwardListScreen from './screens/AwardListScreen'
import EventList from './screens/EventList';
import EventsPage from "./screens/EventsView";
import EventsView from "./screens/EventsView";
import InventoryView from "./screens/InventoryView";
import InventoryList from "./screens/InventoryList"
import PodEventList from './screens/PodEventList';
import PodEventsView from "./screens/PodEventsView";

function App() {
  return (
    <Router>
        <Header/>
        <main className='py-3'>
            <Container>
                <Route exact path="/inventory" component={InventoryList} />
                <Route exact path="/inventory" component={InventoryView} />
                <Route exact path="/podevents" component={PodEventsView} />
                <Route exact path="/podev" component={PodEventList} />
                <Route exact path="/events" component={EventsView} />
                <Route exact path="/events" component={EventList} />
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/login' component={LoginScreen} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/profile' component={ProfileScreen} />
                <Route path='/product/:id' component={ProductScreen}/>
                <Route path='/student/:id' component={StudentScreen}/>
                <Route path='/department/:id' component={DepartmentScreen}/>
                <Route path='/product/delete/:id' component={ProductScreen} />
                <Route path='/admin/userlist' component={UserListScreen}/>
                <Route path='/admin/productlist' component={ProductListScreen}/>
                <Route path='/admin/studentlist' component={StudentListScreen}/>
                <Route path='/admin/departmentlist' component={DepartmentListScreen}/>
                <Route path='/admin/sectionlist' component={SectionListScreen}/>
                <Route path='/admin/trainerlist' component={TrainerListScreen}/>
                <Route path='/admin/awardlist' component={AwardListScreen}/>
                <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
                <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
                <Route path='/admin/student/:id/edit' component={StudentEditScreen}/>
                <Route path='/admin/department/:id/edit' component={DepartmentEditScreen}/>
                <Route path='/admin/section/:id/edit' component={SectionEditScreen}/>
                <Route path='/admin/trainer/:id/edit' component={TrainerEditScreen}/>
                <Route path='/admin/award/:id/edit' component={AwardEditScreen}/>
            </Container>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;
