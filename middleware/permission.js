export default function ({ store, redirect }) {
    if (!store.state..userAccount.role != "Owner") {
      return this.$nuxt.error({ statusCode: 403, message: "No permission" });
    }
  }