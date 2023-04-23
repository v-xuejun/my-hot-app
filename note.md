```
1、createStore方法的一个简单实现，可以了解一下 Store 是怎么生成的。

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({})
  return { getState, dispatch, subscribe };
};
```

2、技术栈

react-router 路由 https://reactrouter.com/en/main/routers/router-provider

redux 状态管理 https://www.redux.org.cn/

ant-mobile UI 组件库 https://mobile.ant.design/zh/guide/quick-start/

ReduxToolkit https://cn.redux.js.org/redux-toolkit/overview/

yarn add @reduxjs/toolkit

3、react-router-dom v6 的类组件使用路由的参数，推荐使用函数组件封装高阶组件 hoc/withRouter.tsx

```

4、生命钩子函数
1) getDerivedStateFromProps
  //getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
  // 该方法返回一个对象用于更新 state，如果返回 null 则不更新任何内容。
  // getDerivedStateFromProps是一个静态方法
  static getDerivedStateFromProps(props: propsType, state: stateType) {
    if (props.location.pathname !== '/user') {
      return {
        visiable: true
      }
    } else {
      return {
        visiable: false
      }
    }
  }

  2) componentWillReceiveProps 已废弃
  //在react16.3之前，componentWillReceiveProps是在不进行额外render的前提下，响应props中的改变并更新state的唯一方式。
  componentWillReceiveProps(nextProps: Readonly<propsType>, nextContext: any): void {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        visiable: nextProps.location.pathname !== '/user'
      })
    }
  }

  3）getSnapshotBeforeUpdate
getSnapshotBeforeUpdate() 方法在最近一次渲染输出（提交到 DOM 节点）之前调用。
在 getSnapshotBeforeUpdate() 方法中，我们可以访问更新前的 props 和 state。
getSnapshotBeforeUpdate() 方法需要与 componentDidUpdate() 方法一起使用，否则会出现错误。

```

5、useActionData <Route path="/song/:songId/edit" action={async ({ params, request }) => { let formData = await request.formData(); return fakeUpdateSong(params.songId, formData); }} /> 每当应用程序向您的路线发送非获取提交（“post”、“put”、“patch”、“delete”）时，都会调用操作。这可以通过几种方式发生

```
6、 react router 路由守卫，鉴权/权限处理
参考文献： https://juejin.cn/post/7195572628958167095 https://blog.csdn.net/Javon_huang/article/details/122252177
router/router

7、国际化常用的库 × react-i18next react-intl react-intl-universa
参考文献：https://juejin.cn/post/6844903874172551182#heading-6

8、设置主题
windi.config.ts darkMode: 'class'
示例：dark:bg-dark-300

9、localStorage 支持过期时间设置参考：https://juejin.cn/post/7196549269581791287
```

10、没有嵌套在 Suspense 的组件,在跳转到组件时，会报错....

````
这个错误提示来自 React Suspense 特性，意思是一个组件在响应同步输入时被暂停。这将导致 UI 被替换为加载指示器。为了解决这个问题，应该用 startTransition 包装会暂停的更新。 在 React Router 中，当你使用 Suspense 和 lazy 加载组件时，如果组件加载过程中出现了同步的操作，就会出现这个错误。为了解决这个问题，你可以使用 React 提供的 startTransition 函数，让这个更新被异步处理。例如： ``` import { startTransition } from 'react'; function handleClick() { startTransition(() => { // your synchronous updates here }); } ``` 需要注意的是，startTransition 只能在 React 18 或更高版本中使用。如果你使用的是 React 17 或更早的版本，需要升级到 React 18 才能使用 startTransition。
这个错误提示来自 React Suspense 特性，意思是一个组件在响应同步输入时被暂停。这将导致 UI 被替换为加载指示器。为了解决这个问题，应该用 startTransition 包装会暂停的更新。

在 React Router 中，当你使用 Suspense 和 lazy 加载组件时，如果组件加载过程中出现了同步的操作，就会出现这个错误。为了解决这个问题，你可以使用 React 提供的 startTransition 函数，让这个更新被异步处理。例如：
解决方法1：
import { startTransition } from 'react';

function handleClick() {
  startTransition(() => {
    // your synchronous updates here
  });
}
解决方法2:
将lazy加载的组件改为同步导入，如下
//const Login = lazy(() => import('@/views/Login'))
import Login from '@/views/Login'
````
