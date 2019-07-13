<script>
export default { // 解决双向数据绑定，在tab中显示慢一拍的问题
  props: {
    panes: {
      type: Array,
      required: true
    }
  },
  render () {
    const contents = this.panes.map(pane => {
      return pane.active ? pane.$slots.default : null
    })
    return (
      <div class="tab-content">
        {contents}
      </div>
    )
  }
}
</script>
