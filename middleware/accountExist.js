export default function ({ store, redirect }) {
    if (store.state.userAccount.role != "Guest") {
      return redirect({path:"/"})
    }
  }