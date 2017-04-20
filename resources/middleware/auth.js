export default function ({ store, axios, redirect, error }) {
  // If user not connected, redirect to /
  if (store.state.authUser === null) {
    // error({
    //   message: 'You are not connected',
    //   statusCode: 403
    // })
    return redirect('/')
  }

  axios.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${store.state.authUser}`
      return config
    }
  )
}
