export default function ({ store, redirect }) {
    if (Object.keys(store.state.newDorm.dorm).length === 0) {
      return redirect({path:"/"})
    }
  }