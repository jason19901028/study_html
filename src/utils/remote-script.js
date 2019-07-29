import Vue from 'vue'

Vue.component('remote-script', {
  render: function (createElement) {
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: (event) => {
          this.$emit('load', event)
        },
        error: (event) => {
          this.$emit('error', event)
        },
        readystatechange: (event) => {
          if (this.readyState !== 'complete') {
            return
          }

          this.$emit('load', event)
        }
      }
    })
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
})
