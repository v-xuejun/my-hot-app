1、React 18 componentDidMount重复执行两次的解决方案
将main.tsx或者main.js文件里的React.StrictMode高阶组件包围去掉即可。
修改前：{
 <React.StrictMode>
  <App />
 </React.StrictMode>
  }
  修改后：{
  <App />
  }
  
  2、react-router-dom v6 的路由传参方式
  1) <Link  to="/user/1"/>
  需要配置路由  <Route path='/user/:id' component={User}></Route>
  const routeParams = useParams()
  routeParams.id
  
  2）<Link to={{ pathname: '/user', search: '?name=john',}}>跳转</Link>
  路由规则：<Route path="/user" component={User}/>
  let [searchParams, setSearchParams] = useSearchParams();
	searchParams.get('name')
	
 3） <Link  to={'/user'} state={{ id: 'xxxx' }} />
  路由规则：<Route path="/user" component={User}/>
 let { state } = useLocation();
 state.id
 
 4）<Route path="/user" render={(props) => <User {...props} age={25}/>}/>
 使用`render`属性来渲染一个匿名函数，这个函数接收一个`props`参数，我们可以使用解构语法来获取`history`、`location`和`match`等参数，并将这些参数传递给`User`组件。
 同时，我们也可以在这个函数中添加额外的参数，例如`age`