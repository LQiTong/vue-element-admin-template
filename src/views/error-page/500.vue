<template>
  <div class="main-page-content">
    <Exception type="500" exception-style="min-height:500px; height:80%;" />
  </div>
</template>

<script>
import Exception from '@/components/Ape/Exception'
export default {
  name: 'Error500',
  components: {
    Exception
  }
}
</script>
