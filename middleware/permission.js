export default function ({ store, redirect }) {
    if (store.state.userAccount.role != "Owner") {
      return redirect({path:"/"})
    }
  }