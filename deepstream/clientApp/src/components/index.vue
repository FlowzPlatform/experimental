<template>
  <div class="Index">
  	<div v-html="htmlData"></div>
    <!-- <div>{{{htmlData}}}</div> -->
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Index',
  props: {
    options: {
      type: Object
    }
  },
  data () {
    return {
      htmlData: ``
    }
  },
  component: {
  },
  methods: {
  	
  },
  mounted () {
  	
  },
  created () {
  	axios.get('http://localhost:3000/f3df2e8a2e1f46a383eef403452b77d4?pageName=registration')
  	.then( (response) => {
  	    console.log(response);
  	    this.htmlData = response.data;
        console.log("Data: ", response.data)
  	})
  	.catch( (error) => {
  	    console.log(error.response);
  	    this.htmlData = error.response.data.error
  	});
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
