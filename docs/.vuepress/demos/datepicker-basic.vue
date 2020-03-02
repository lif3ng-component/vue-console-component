<template>
  <div>
    <!-- <d-time-picker /> -->

    <!-- 选择月 -->
    <d-table-header>
      {{ valueMonth | datetime }}
      <d-date-picker
        type="month"
        max="now"
        initValue="now"
        v-model="valueMonth"
        right
      />
    </d-table-header>
    
    <d-table-header>
      {{ valueTime | datetime }}
      <d-date-picker
        type="sec"
        :min="baseTime"
        :initValue="baseTime"
        v-model="valueTime"
        right
      />
    </d-table-header>
  </div>
</template>
<script>
export default {
  data() {
    const next5min = new Date()
    next5min.setMinutes(next5min.getMinutes()+5)
    next5min.setSeconds(0)
    next5min.setMilliseconds(0)
    return {
      valueMonth:'',
      valueTime:'',
      baseTime:next5min
    };
  },
  computed: {
    formattedMonth() {
      return this.valueMonth && new Date(this.valueMonth).toLocaleDateString();
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>
