export default {
  updateCount (state, { num }) {
    console.log(num)
    state.count = num
  }
}
