<template>
  <div>
    <!-- 选择月 -->
    <d-table-header>
      月：
      {{ valueMonth | datetime }}
      <d-date-picker
        type="month"
        max="now"
        initValue="now"
        v-model="valueMonth"
        right
      />
    </d-table-header>

    <!-- 选择日 -->
    <d-table-header>
      日：
      {{ valueDate | datetime }}
      <d-date-picker
        type="date"
        :min="minDay"
        max="now"
        initValue="now"
        v-model="valueDate"
        right
      />
    </d-table-header>

    <d-table-header>
      日：
      
      <d-date-picker
        type="date"
        max="now"
        v-model="valueUndefined"
        right
      />
    </d-table-header>

    <!-- 选择秒 -->
    <d-table-header>
      秒：
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
    const next5min = new Date();
    next5min.setMinutes(next5min.getMinutes() + 5);
    next5min.setSeconds(0);
    next5min.setMilliseconds(0);
    const prev7day = new Date();
    prev7day.setDate(prev7day.getDate() - 20);
    prev7day.setHours(0);
    prev7day.setMinutes(0);
    prev7day.setSeconds(0);
    prev7day.setMilliseconds(0);
    return {
      valueMonth: "",
      valueTime: "",
      valueDate: "",
      valueUndefined:undefined,
      minDay: prev7day,
      baseTime: next5min
    };
  },
  computed: {
    formattedMonth() {
      return this.valueMonth && new Date(this.valueMonth).toLocaleDateString();
    }
  },
};
</script>
